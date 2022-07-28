import 'source-map-support/register'
import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'
import {UpdateTodoRequest} from '../../requests/UpdateTodoRequest'
import {updateToDo} from "../../businessLogic/ToDo";
import {createLogger} from "../../utils/logger";

const logger = createLogger('update_todo');
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
    logger.info("Updating Todo");
    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');
    const jwtToken = split[1];
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body);

    if (updatedTodo.name === "" || updatedTodo.dueDate === "")
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

    const todoId = event.pathParameters.todoId;


    const todoItem = await updateToDo(updatedTodo, todoId, jwtToken);
    logger.info("Todo Updated", todoItem);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            "item": todoItem
        }),
    }
};
