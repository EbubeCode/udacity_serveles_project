import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda';
import {deleteToDo} from "../../businessLogic/ToDo";
import {createLogger} from "../../utils/logger";

const logger = createLogger('delete_todo');
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Remove a TODO item by id
    logger.info("Deleting Todo");
    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');
    const jwtToken = split[1];

    const todoId = event.pathParameters.todoId;

    const deleteData = await deleteToDo(todoId, jwtToken);
    logger.info(`Todo with id ${todoId} deleted`);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Credentials': true
        },
        body: deleteData,
    }
};
