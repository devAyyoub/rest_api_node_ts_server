import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition : {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                descriptionç: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: '1.0.0',
            description: 'API docs for products'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('https://www.cdnlogo.com/logos/n/88/nodejs.svg');
            height: 120px;
            width: auto;
        }
        .swagger-ui .topbar {
            background-color: gray
        }
    `
}
export default swaggerSpec
export {
    swaggerUiOptions
}