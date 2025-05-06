<?php
class jsonResponse
{
    public function respondUnprocessableEntity(array $errors): void
    {
        http_response_code(422);
        echo json_encode(["errors" => $errors]);
    }

    public function respondMethodNotAllowed(string $allowed_methods): void
    {
        http_response_code(405);
        header("Allow: $allowed_methods");
    }

    public function respondNotFound(string $id): void
    {
        http_response_code(404);
        echo json_encode(["message" => "Task with ID $id not found"]);
    }

    public function respondCreated($message): void
    {
        http_response_code(201);
        echo json_encode(["message" => $message]);
    }
    //   public function respondVerified(): void
//   {
//       http_response_code(201);
//       echo json_encode(["message" => "Your email has been created verified successfully"]);
//   }

}