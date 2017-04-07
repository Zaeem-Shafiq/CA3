package httpErrors;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;

public class BookNotFoundExceptionMapper implements ExceptionMapper<BookNotFoundException> {

    @Override
    public Response toResponse(BookNotFoundException e) {
        return Response.status(404).entity("{\"code\": 404, \"message\": \"" + e.getMessage() + "\"}").build();
    }
    
}
