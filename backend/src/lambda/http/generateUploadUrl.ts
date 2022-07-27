import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda'
import {generateUploadUrl} from "../../businessLogic/ToDo";
import {createLogger} from "../../utils/logger";

const logger = createLogger('generate_uploadUrl');
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    logger.info("Generating UploadUrl");
    const todoId = event.pathParameters.todoId;

    const URL = await generateUploadUrl(todoId);
    logger.info(`Todo with id ${todoId} has a generatedUploadUrl`)
    return {
        statusCode: 202,
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            uploadUrl: URL,
        })
    };
};