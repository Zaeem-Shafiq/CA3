package httpErrors;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;

public class UserNotFoundExceptionMapper implements ExceptionMapper<UserNotFoundException> {

    @Override
    public Response toResponse(UserNotFoundException e) {
        return Response.status(404).entity("{\"code\": 404, \"message\": \"" + e.getMessage() + "\"}").build();
    }

}
