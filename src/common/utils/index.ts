import axios, { CreateAxiosDefaults } from "axios";
import * as _ from "lodash";
import moment from "moment";
export class Util {
    static insertToArray(arr: any[], index: number, ...newItems: any) {
        return [...arr.slice(0, index), ...newItems, ...arr.slice(index)];
    }

    static async parseMessengeWithInfo(params: { message: string; info: any }) {
        let { message } = params;
        const { info } = params;
        const regex = /({|})/g;
        const regex2 = /({{\w+}})|({{\w+(?:\.\w+)+)}}/g;
        if (regex.test(message)) {
            const replaceText: RegExpMatchArray | null = message.match(regex2);
            if (replaceText) {
                for (let item of replaceText) {
                    item = item.replace(regex, "");
                    message = message.replace(item, _.get(info, item));
                }
                message = message.replace(regex, "");
            }
        }
        return message;
    }
    static async encode(data: any) {
        const arr = this.encodeObject(data);
        return arr.join(":");
    }
    static encodeObject(data: any): any[] {
        const arr = [];
        const keys = Object.keys(data);
        for (const key of keys) {
            let str;
            let arrobj = [];
            if (typeof data[key] == "object") {
                arrobj = this.encodeObject(data[key]);
                for (const element of arrobj) {
                    str = key + "." + element;
                    arr.push(str);
                }
            } else {
                str = key + "=" + data[key];
                arr.push(str);
            }
        }
        return arr;
    }
    static async decode(data: any) {
        const arr1 = [];
        const arr2 = [];
        const arr = data.split(":");
        const arrElement = [];
        for (let item of arr) {
            if (/(\.\d\.)/g.test(item)) {
                let num = item.match(/(\.\d\.)/g).join();
                num = num.replace(/\./g, "");
                item = item.replace(/(\.\d)/g, "[" + num + "]");
            } else if (/(\.\d)/g.test(item)) {
                let num = item.match(/(\.\d)/g).join();
                num = num.replace(/\./g, "");
                item = item.replace(/(\.\d)/g, "[" + num + "]");
            }
            const element = item.split("=");
            arr1.push(element[0]);
            arr2.push(element[1]);
        }
        arrElement.push(arr1);
        arrElement.push(arr2);
        return arrElement;
    }

    static convertViToEng(string: string) {
        const obj = {
            Đ: "D",
            đ: "d",
            â: "a",
            ă: "a",
            ê: "e",
            ô: "o",
            ơ: "o",
            ư: "u",
            á: "a",
            à: "a",
            ạ: "a",
            ả: "a",
            ã: "a",
            ắ: "a",
            ằ: "a",
            ặ: "a",
            ẳ: "a",
            ẵ: "a",
            ấ: "a",
            ầ: "a",
            ậ: "a",
            ẩ: "a",
            ẫ: "a",
            é: "e",
            è: "e",
            ẻ: "e",
            ẽ: "e",
            ẹ: "e",
            ế: "e",
            ề: "e",
            ể: "e",
            ễ: "e",
            ệ: "e",
            ý: "y",
            ỳ: "y",
            ỵ: "y",
            ỷ: "y",
            ỹ: "y",
            ú: "u",
            ù: "u",
            ủ: "u",
            ũ: "u",
            ụ: "u",
            ứ: "u",
            ừ: "u",
            ử: "u",
            ữ: "u",
            ự: "u",
            í: "i",
            ì: "i",
            ị: "i",
            ỉ: "i",
            ĩ: "i",
            ó: "o",
            ò: "o",
            ỏ: "o",
            õ: "o",
            ọ: "o",
            ố: "o",
            ồ: "o",
            ổ: "o",
            ỗ: "o",
            ộ: "o",
            ớ: "o",
            ờ: "o",
            ở: "o",
            ỡ: "o",
            ợ: "o",
        } as any;

        string = string.trim();
        string = string.toLowerCase();

        const arr: string[] = string.split("");

        for (const i in arr) {
            const arri = arr[i];
            if (!arri) continue;
            if (obj[arri]) {
                arr[i] = obj[arri];
            }
        }

        return arr.join("");
    }

    static changeToSlug(title: string, prefix: string) {
        // Đổi chữ hoa thành chữ thường
        let slug = title.toLowerCase();

        // Đổi ký tự có dấu thành không dấu
        slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
        slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
        slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
        slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
        slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
        slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
        slug = slug.replace(/đ/gi, "d");
        // Xóa các ký tự đặt biệt
        slug = slug.replace(
            /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
            ""
        );
        // Đổi khoảng trắng thành ký tự gạch ngang
        slug = slug.replace(/ /gi, "-");
        // Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
        // Phòng trường hợp người nhập vào quá nhiều ký tự trắng
        slug = slug.replace(/\-\-\-\-\-/gi, "-");
        slug = slug.replace(/\-\-\-\-/gi, "-");
        slug = slug.replace(/\-\-\-/gi, "-");
        slug = slug.replace(/\-\-/gi, "-");
        // Xóa các ký tự gạch ngang ở đầu và cuối
        slug = `@${slug}@`.replace(/\@\-|\-\@|\@/gi, "");
        return `@${slug}-${prefix}@`.replace(/\@\-|\-\@|\@/gi, "");
    }

    convertViToEngSlug(string: string) {
        const obj = {
            Đ: "D",
            đ: "d",
            â: "a",
            ă: "a",
            ê: "e",
            ô: "o",
            ơ: "o",
            ư: "u",
            á: "a",
            à: "a",
            ạ: "a",
            ả: "a",
            ã: "a",
            ắ: "a",
            ằ: "a",
            ặ: "a",
            ẳ: "a",
            ẵ: "a",
            ấ: "a",
            ầ: "a",
            ậ: "a",
            ẩ: "a",
            ẫ: "a",
            é: "e",
            è: "e",
            ẻ: "e",
            ẽ: "e",
            ẹ: "e",
            ế: "e",
            ề: "e",
            ể: "e",
            ễ: "e",
            ệ: "e",
            ý: "y",
            ỳ: "y",
            ỵ: "y",
            ỷ: "y",
            ỹ: "y",
            ú: "u",
            ù: "u",
            ủ: "u",
            ũ: "u",
            ụ: "u",
            ứ: "u",
            ừ: "u",
            ử: "u",
            ữ: "u",
            ự: "u",
            í: "i",
            ì: "i",
            ị: "i",
            ỉ: "i",
            ĩ: "i",
            ó: "o",
            ò: "o",
            ỏ: "o",
            õ: "o",
            ọ: "o",
            ố: "o",
            ồ: "o",
            ổ: "o",
            ỗ: "o",
            ộ: "o",
            ớ: "o",
            ờ: "o",
            ở: "o",
            ỡ: "o",
            ợ: "o",
        } as any;

        string = string.trim();
        string = string.toLowerCase();

        const arr = string.split("");

        for (const i in arr) {
            const arri = arr[i];
            if (!arri) continue;
            if (obj[arri]) {
                arr[i] = obj[arri];
            }
        }

        let slug = arr.join("");
        slug = slug.replace(/ /g, "-");
        // slug = slug.replace(/[^a-zA-Z0-9]/g, '');
        return slug.replace(/[^a-zA-Z0-9\-]/g, "");
    }

    static validateEmail(email: string) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }

    static isEmpty(val: any) {
        return val === undefined || val == undefined || val.length <= 0
            ? true
            : false;
    }
    static isObject(val: any) {
        return typeof val === "object" && !Array.isArray(val) && val !== null;
    }
    static allEmpty(...val: any) {
        for (const item of val) {
            if (item !== undefined && item !== undefined) return false;
        }
        return true;
    }
    static revokeFileName(
        oldFileName: string,
        addTime: boolean = true,
        resizeOptions?: { height: number; width: number }
    ) {
        const index = oldFileName.lastIndexOf(".");
        const newFileName = `${oldFileName.substring(0, index)}${addTime ? `-${moment().valueOf()}` : ""
            }`;
        if (resizeOptions?.height || resizeOptions?.width) {
            return `${newFileName}-${resizeOptions.width}x${resizeOptions.height
                }${oldFileName.substring(index)}`;
        }
        return `${newFileName}${oldFileName.substring(index)}`;
    }
    static makeContent(content: string, values: any) {
        for (const key in values) {
            if (values.hasOwnProperty(key)) {
                const value = values[key];
                const re = new RegExp(`\\[${key}\\]`, "g");
                content = content.replace(re, value);
            }
        }
        return content;
    }
    static snakeCaseToCamelCase(string: string) {
        return string
            .toLowerCase()
            .replace(/([-_][a-z])/g, (group) =>
                group.toUpperCase().replace("-", "").replace("_", "")
            );
    }

    static camelCaseToSnakeCase(string: string) {
        const result = string.replace(/([A-Z])/g, " $1");
        return result
            .split(" ")
            .filter((item) => !!item.trim())
            .join("_")
            .toLowerCase();
    }

    static camelize(string: string) {
        return string
            .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            })
            .replace(/\s+/g, "");
    }

    static capitalize(string: string) {
        return string[0]?.toUpperCase() + string.slice(1);
    }

    static generateUUIDV4() {
        // Public Domain/MIT
        var d = new Date().getTime(); //Timestamp
        var d2 =
            (typeof performance !== "undefined" &&
                performance.now &&
                performance.now() * 1000) ||
            0; //Time in microseconds since page-load or 0 if unsupported
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (c) {
                var r = Math.random() * 16; //random number between 0 and 16
                if (d > 0) {
                    //Use timestamp until depleted
                    r = (d + r) % 16 | 0;
                    d = Math.floor(d / 16);
                } else {
                    //Use microseconds since page-load if supported
                    r = (d2 + r) % 16 | 0;
                    d2 = Math.floor(d2 / 16);
                }
                return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
            }
        );
    }

    static fetch(
        baseURL: string,
        configAxios: CreateAxiosDefaults<any> = {
            timeout: 1000,
        },

    ) {
        configAxios.baseURL = baseURL;
        return axios.create(configAxios);
    }

    static timeToMinutes(time: string) {
        const [hours, minutes] = time.split(":");

        return (
            parseInt(hours ? hours : "0", 10) * 60 +
            parseInt(minutes ? minutes : "0", 10)
        );
    }

    static checkOverlap(startA: number, endA: number, startB: number, endB: number) {
        return endA > startB && endB > startA;
    }

    static convertArrayObjectToObject(input: Array<any>, key: string = "id"): any {
        return input.reduce((acc, obj) => {
            acc[obj[key]] = obj;
            return acc;
        }, {});
    }

    static exclude<T, Key extends keyof T>(
        object: T,
        keys: Key[]
    ): Omit<T, Key> {
        for (let key of keys) {
            delete object[key]
        }
        return object;
    }
    static generateTransactionCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const length = 5;
        let transactionCode = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            transactionCode += characters.charAt(randomIndex);
        }

        return transactionCode + moment().format("DDMMYYYYhhmmssSSS");
    }

    static removeEmpty(obj: any, arr = [undefined, "", null]) {
        return Object.fromEntries(Object.entries(obj).filter(([_, v]) => !arr.includes(v as any)));
    }
}
