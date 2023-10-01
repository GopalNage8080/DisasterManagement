package DM;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.Headers;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class StringServer {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        server.createContext("/string_endpoint", new StringHandler());
        server.setExecutor(null); // Use the default executor
        server.start();
        System.out.println("Server started on port 8000...");
    }

    static class StringHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Set CORS headers to allow requests from any origin
            Headers headers = exchange.getResponseHeaders();
            headers.set("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
            headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow various HTTP methods
            headers.set("Access-Control-Allow-Headers", "Content-Type"); // Allow Content-Type header

            String response = "40%";
            exchange.sendResponseHeaders(200, response.length());
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
    }
}
