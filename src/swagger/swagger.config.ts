import { DocumentBuilder} from "@nestjs/swagger";



export const configSwagger = new DocumentBuilder()
    .addBearerAuth({
        name: 'Access token',
        type: 'http',
        bearerFormat: 'JWT'
    })
    .setTitle('Documention API')
    .setDescription(
        '<h3>Specifying attributes for SELECT queries</h3>'
        + '<p> - To select only some attributes, you can use the <code>fields</code> option:</p>'
        + ' <ul>'
        + '     <li><mark>"$all"</mark> query to all record (with out record is soft deleted)'
        + '         <ul>'
        + '             <li>fields=["$all"]</li>'
        + '         </ul>'
        + '     </li>'
        + '     <li><mark>"$paranoid"</mark> query to all including record is deleted_at'
        + '         <ul>'
        + '             <li>fields=["$paranoid"]</li>'
        + '         </ul>'
        + '     </li>'
        + '     <li><mark>"field_name"</mark> retrieve only field "field_name" in the table'
        + '         <ul>'
        + '             <li>fields=["field_a"]</li>'
        + '             <li>fields=["field_a","field_b"]</li>'
        + '         </ul>'
        + '     </li>'
        + '     <li><mark>{"other_table":["$all"]}</mark> is alias to "other_table"'
        + '         <ul>'
        + '             <li>fields=[ "$all", { "table_a" : ["$all"] } ]</li>'
        + '             <li>fields=[ "$all", { "table_b" : ["field_a", "field_b"] } ]</li>'
        + '         </ul>'
        + '     </li>'
        + ' </ul>'
        + '<h3>Applying WHERE clauses</h3>'
        + '<p> - The <code>where</code> is used to filter records. It is used to extract only those records that fulfill a specified condition.</p>'
        + ' <ul>'
        + '     <li><mark>"$eq"</mark> is equal (field == value)'
        + '         <ul>'
        + '             <li>where={ "field_a" : { "$eq" : 100} }</li>'
        + '             <li>where={ "field_b" : { "$eq" : "abc" } }</li>'
        + '             <li>where={ "field_a" : { "$eq" : 100 }, "field_b" : { "$eq" : "abc" } }</li>'
        + '         </ul>'
        + '     </li>'
        + '     <li><mark>"$ne"</mark> is equal (field != value)'
        + '         <ul>'
        + '             <li>where={ "field_a" : { "$ne" : 100} }</li>'
        + '             <li>where={ "field_a" : { "$ne" : 100 }, "field_b" : { "$ne" : "abc" } }</li>'
        + '         </ul>'
        + '     </li>'
        + ' </ul>'
        + ' Some other operators : <mark>$gt</mark> <mark>$gte</mark> <mark>$lt</mark> <mark>$lte</mark> <mark>$and</mark> <mark>$or</mark> <mark>$in</mark> <mark>$notIn</mark> <mark>$like</mark> <mark>$iLike</mark> ....'
        + '<h3>Ordering</h3>'
        + '<p> - The <code>order</code> option takes an array of items to order the query by or a sequelize method. These <em>items</em> are themselves arrays in the form <code>[column, direction]</code>. The column will be escaped correctly and the direction will be checked in a whitelist of valid directions (such as <code>ASC</code>, <code>DESC</code>, <code>NULLS FIRST</code>, etc).</p>'
        + ' <ul>'
        + '   <li>order=[["created_at","DESC"]]</li>'
        + '   <li>order=[["created_at","DESC"],["id","ASC"]]</li>'
        + ' </ul>'
        + '<h3>Limits and Pagination</h3>'
        + '<p> - The <code>limit</code> and <code>page</code> options allow you to work with limiting / pagination:</p>'
        + ' <ul>'
        + '   <li>limit=50&page=1</li>'
        + '   <li>limit=50&page=2</li>'
        + ' </ul>'

    )
    .setVersion('1.0')
    .build();