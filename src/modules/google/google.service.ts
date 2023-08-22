import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

interface IGoogleTokenPlayload {
    iss: string,
    azp: string,
    aud: string,
    sub: string,
    email: string,
    email_verified: boolean,
    at_hash: string,
    name: string,
    picture: string,
    given_name: string,
    family_name: string,
    locale: string,
    iat: number,
    exp: number
}


@Injectable()
export class GoogleService {
    oauth2Client: OAuth2Client;
    clientId: any;
    clientSecret: string;
    constructor(
        private readonly configService: ConfigService
    ) {
        this.clientId = this.configService.get("google.client_id");
        this.clientSecret = "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";
        this.oauth2Client = new OAuth2Client(this.clientId, this.clientSecret);
    }
    async verify(googleToken: string): Promise<IGoogleTokenPlayload> {
        const ticket = await this.oauth2Client.verifyIdToken({
            idToken: googleToken,
            audience: this.clientId
        });
        return ticket.getPayload() as IGoogleTokenPlayload
    }

    async getUserInfo(token: string) {
        this.oauth2Client.setCredentials({ access_token: token });

        const people = google.people({
            version: 'v1',
            auth: this.oauth2Client,
        });

        const profile: any = await people.people.get({
            resourceName: 'people/me',
            personFields: 'genders,birthdays',
        });
        const gender = profile.data.genders && profile.data.genders.length > 0 ? profile.data.genders[0].value : null;
        const dateOfBirth = profile.data.birthdays && profile.data.birthdays.length > 0 ? profile.data.birthdays[0].date : null;

        return { gender, dateOfBirth };
    }

    async getUserInfoWithAccessToken(accessToken: string) {
        return (await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })).data
    }
}