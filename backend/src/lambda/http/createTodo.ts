import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'
import {CreateTodoRequest} from '../../requests/CreateTodoRequest';
import {createToDo} from "../../businessLogic/ToDo";
import {createLogger} from "../../utils/logger";

const logger = createLogger('create_todo');
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body);
    // TODO: Implement creating a new TODO item
    logger.info("Creating Todo");
    const auth = event.headers.Authorization;
    const split = auth.split(' ');
    const jwtToken = split[1];


    if (newTodo.name === "" || newTodo.dueDate === "")
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({
                "message": "invalid schema"
            }),
        }
    const newItem = await createToDo(newTodo, jwtToken);
    logger.info("Created new todo", newItem);
    return {
        statusCode: 201,
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            "item": newItem
        }),
    }
};
