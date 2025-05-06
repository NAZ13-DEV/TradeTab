<?php

class Database
{

    // public function check_Database(string $dbname)
    // {
    //     $database = new dbconnect("", $_ENV["DB_HOST"], $_ENV["DB_USER"], $_ENV["DB_PASS"]);
    //     $dbConnection = $database->getDbconnect();
    //     if ($dbConnection) {
    //         $dbnameToCheck = $dbname;
    //         $query = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = :dbname";
    //         $stmt = $dbConnection->prepare($query);
    //         $stmt->bindParam(':dbname', $dbnameToCheck, PDO::PARAM_STR);
    //         $stmt->execute();

    //         if ($stmt->rowCount() > 0) {
    //             $db = new dbconnect($dbnameToCheck, $_ENV["DB_HOST"], $_ENV["DB_USER"], $_ENV["DB_PASS"]);
    //             return $db;
    //         } else {
    //             $query = "CREATE DATABASE IF NOT EXISTS $dbnameToCheck";
    //             if ($database->exec($query) === TRUE) {
    //                 $database = new dbconnect($dbnameToCheck, $_ENV["DB_HOST"], $_ENV["DB_USER"], $_ENV["DB_PASS"]);
    //                 return $database;
    //             } else {
    //                 return FALSE;
    //             }
    //         }
    //     }
    // }
    public function check_Database(string $dbname)
    {
        $database = new dbconnect("", $_ENV["DB_HOST"], $_ENV["DB_USER"], $_ENV["DB_PASS"]);
        $dbConnection = $database->getDbconnect();
        if ($dbConnection) {
            $dbnameToCheck = $dbname;
            $query = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = :dbname";
            $stmt = $dbConnection->prepare($query);
            $stmt->bindParam(':dbname', $dbnameToCheck, PDO::PARAM_STR);
            $stmt->execute();
    
            if ($stmt->rowCount() > 0) {
                // Database exists, return a PDO connection for the target database
                $db = new dbconnect($dbnameToCheck, $_ENV["DB_HOST"], $_ENV["DB_USER"], $_ENV["DB_PASS"]);
                return $db->getDbconnect();
            } else {
                // Database does not exist, create it
                $query = "CREATE DATABASE IF NOT EXISTS `$dbnameToCheck`";
                if ($dbConnection->exec($query) !== false) {
                    $database = new dbconnect($dbnameToCheck, $_ENV["DB_HOST"], $_ENV["DB_USER"], $_ENV["DB_PASS"]);
                    return $database->getDbconnect();
                } else {
                    return false; // Database creation failed
                }
            }
        }
        return false; // Initial connection failed
    }
    
    public function check_Table(string $tableName, $dbConnection)
    {
        $tableName = trim($tableName);
        try {
            // Check if the table exists
            $queryCheckTable = "SHOW TABLES LIKE '$tableName'";
            $tableExists = $dbConnection->query($queryCheckTable);

            // Use fetchColumn instead of rowCount
            $tableExistsResult = $tableExists->fetchColumn();

            if (!$tableExistsResult) {
                // Table doesn't exist, create it
                $queryCreateTable = "CREATE TABLE $tableName (
                        id INT PRIMARY KEY AUTO_INCREMENT)";
                $execute = $dbConnection->exec($queryCreateTable);

                // Return true if the table was created successfully
                return 'created';
            } else {
                // Table already exists
                return true;
            }
        } catch (PDOException $e) {
            // Handle exceptions, log errors, or return false based on your needs
            echo 'Error: ' . $e->getMessage();
            return false;
        }
    }

    public function getLastColumnName($dbConnection, string $tableName)
    {
        // Query to get the column names
        $query = "DESCRIBE $tableName";

        // Prepare and execute the query
        $stmt = $dbConnection->prepare($query);
        $stmt->execute();

        // Fetch the results
        $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
        // Get the last column name
        $lastColumn = end($columns)['Field'];

        // Return the last column name
        return $lastColumn;
    }

    public function getColumnNames(PDO $dbConnection, string $tableName)
    {
        $query = "DESCRIBE `$tableName`";
        $stmt = $dbConnection->prepare($query);
        $stmt->execute();
        $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
        return $columns;
    }

    // public function AlterTableInsert(string $tableName, PDO $dbConnection, array $columns, string $last, array $data)
    // {
    //     // Check if columns already exist in the table
    //     $existingColumns = $this->getColumnNames($dbConnection, $tableName);

    //     // Filter out existing columns from the provided columns
    //     $newColumns = array_diff($columns, $existingColumns);

    //     // If there are new columns to be added
    //     if (!empty($newColumns)) {
    //         $query = "ALTER TABLE `$tableName`";
    //         $previousColumnName = $last;

    //         foreach ($newColumns as $columnName) {
    //             $default = ($columnName == $last) ? "NULL DEFAULT NULL" : "NULL  DEFAULT NULL";
    //             $after = ($columnName == $last) ? "" : "AFTER `$previousColumnName`";

    //             // Concatenate the column definition to the query
    //             $query .= " ADD `$columnName` VARCHAR(500) $default $after,";

    //             $previousColumnName = $columnName;
    //         }

    //         // Remove the trailing comma
    //         $query = rtrim($query, ',');

    //         try {
    //             // Execute the ALTER TABLE query
    //             $dbConnection->exec($query);


    //             // Terminate the PDO connection
    //             $dbConnection = null;

    //             // Exit the script, assuming the alteration was the main task
    //             return true;
    //         } catch (PDOException $e) {
    //             // Handle the exception, e.g., log the error
    //             return false;
    //         }
    //     }

    //     $lastInsertedId = $this->insertData($dbConnection, $tableName, $columns, $data);

    //     if ($lastInsertedId) {
    //         return "success";
    //     } else {
    //         return "failed";
    //     }
    // }

    public function AlterTableUpdate(string $tableName, PDO $dbConnection, array $columns, string $last, array $data, string $whereColumn, $whereValue)
    {
        // Check if columns already exist in the table
        $existingColumns = $this->getColumnNames($dbConnection, $tableName);

        // Filter out existing columns from the provided columns
        $newColumns = array_diff($columns, $existingColumns);

        // If there are new columns to be added
        if (!empty($newColumns)) {
            $query = "ALTER TABLE `$tableName`";
            $previousColumnName = $last;

            foreach ($newColumns as $columnName) {
                $default = ($columnName == $last) ? "NULL DEFAULT NULL" : "NULL  DEFAULT NULL";
                $after = ($columnName == $last) ? "" : "AFTER `$previousColumnName`";

                // Concatenate the column definition to the query
                $query .= " ADD `$columnName` VARCHAR(200) $default $after,";

                $previousColumnName = $columnName;
            }

            // Remove the trailing comma
            $query = rtrim($query, ',');

            try {
                // Execute the ALTER TABLE query
                $dbConnection->exec($query);

                // Continue with the rest of your logic here...

                // If you need to return something meaningful, you can return true or any other value
                return true;
            } catch (PDOException $e) {
                // Handle the exception, e.g., log the error
                echo "Error during ALTER TABLE: " . $e->getMessage();
                return false;
            }
        }

        // Rest of your logic for updating data goes here...

        try {
            // Assuming you have an 'updateData' function that updates data in the table
            $lastInsertedId = $this->updateData($dbConnection, $tableName, $columns, $data, $whereColumn, $whereValue);

            if ($lastInsertedId) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            // Handle the exception for the data update
            echo "Error during data update: " . $e->getMessage();
            return false;
        }
    }

    public function AlterTable(string $tableName, PDO $dbConnection, array $columns, string $last)
    {
        $existingColumns = $this->getColumnNames($dbConnection, $tableName);
        $newColumns = array_diff($columns, $existingColumns);
        if (!empty($newColumns)) {
            $query = "ALTER TABLE `$tableName`";
            $previousColumnName = $last;
            foreach ($newColumns as $columnName) {
                // Check if column already exists
                if (in_array($columnName, $existingColumns)) {
                    continue;
                }
                $default = ($columnName == $last) ? "NULL DEFAULT NULL" : "NULL";
                $after = ($columnName == $last) ? "" : "AFTER `$previousColumnName`";
                $query .= " ADD `$columnName` VARCHAR(200) $default $after,";
                $previousColumnName = $columnName;
            }
            $query = rtrim($query, ',');

            try {
                $dbConnection->exec($query);
                // $dbConnection = null;
                return true;
            } catch (PDOException $e) {
                return false;
            }
        }
    }
    public function AlterTableWithTypes(string $tableName, PDO $dbConnection, array $columnsWithTypes, string $last): bool
    {
        $existingColumns = $this->getColumnNames($dbConnection, $tableName);
        $newColumns = array_diff(array_keys($columnsWithTypes), $existingColumns);
        if (!empty($newColumns)) {
            $query = "ALTER TABLE $tableName";
            $previousColumnName = $last;
            foreach ($newColumns as $columnName) {
                if (in_array($columnName, $existingColumns)) {
                    continue;
                }
                // Get the column type or default to VARCHAR(255)
                $columnType = isset($columnsWithTypes[$columnName]) ? $columnsWithTypes[$columnName] : 'VARCHAR(255)';
                $default = ($columnName == $last) ? "NULL DEFAULT NULL" : "NULL";
                $after = ($columnName == $last) ? "" : "AFTER $previousColumnName";
                $query .= " ADD $columnName $columnType $default $after,";
                $previousColumnName = $columnName;
                // var_dump($query);

            }

            $query = rtrim($query, ',');
                // var_dump($default);
           
            try {
                $dbConnection->exec($query);
                return true;
            } catch (PDOException $e) {
                // Log or handle the error message as needed
                error_log("Failed to alter table: " . $e->getMessage());
                return false;
            }
        }

        return true; // No new columns to add
    }
    public function insertDataWithTypes(PDO $pdo, string $tableName, array $columns, array $bindingArray, array $data)
    {
        //   var_dump(count($columns) ,count($data));
        //   var_dump(array_keys($columns), $data);
        if (count($columns) !== count($data)) {
            throw new InvalidArgumentException("Number of columns and data elements must match");
        }

        // Prepare the SQL statement
        $columnNames = implode(', ', array_keys($columns));
        $valuePlaceholders = ':' . implode(', :', $bindingArray);
        $sql = "INSERT INTO $tableName ($columnNames) VALUES ($valuePlaceholders)";
        // echo "SQL Query: " . $sql . "<br>";

        $stmt = $pdo->prepare($sql);
        $dataKeys = array_keys($data);
        $dataValues = array_values($data);

        for ($i = 0; $i < count($dataKeys); $i++) {
            $column = $dataKeys[$i];
            $values = $dataValues[$i];
            $index = $i;
            if (isset($bindingArray[$index])) {
                // Bind the value using index position
                $stmt->bindValue(':' . $bindingArray[$index], $values);
                // var_dump($bindingArray[$index], $values);
            }
        }

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }


    public function insertDataReturnId(PDO $pdo, string $tableName, array $columns, array $bindingArray, array $data)
    {
        // Check if the number of columns and data elements match
        if (count($columns) !== count($data)) {
            throw new InvalidArgumentException("Number of columns and data elements must match");
        }

        // Prepare the SQL statement
        $columnNames = implode(', ', $columns);
        $valuePlaceholders = ':' . implode(', :', $bindingArray); // Use named placeholders

        $sql = "INSERT INTO $tableName ($columnNames) VALUES ($valuePlaceholders)";
        // echo "SQL Query: " . $sql . "<br>";
        // try {
        // Create a prepared statement
        $stmt = $pdo->prepare($sql);
        // var_dump($stmt);

        $dataKeys = array_keys($data);
        $dataValues = array_values($data);

        for ($i = 0; $i < count($dataKeys); $i++) {
            $column = $dataKeys[$i];
            $values = $dataValues[$i];
            $index = $i;
            if (isset($bindingArray[$index])) {
                // Bind the value using index position
                $stmt->bindValue(':' . $bindingArray[$index], $values);
                // var_dump($bindingArray[$index], $values);
            }
        }




        $stmt->execute();
        return $pdo->lastInsertId();
    }

    public function insertData(PDO $pdo, string $tableName, array $columns, array $bindingArray, array $data)
    {
            //   var_dump(count($columns) ,count($data));
            //   var_dump($columns ,$data);
        if (count($columns) !== count($data)) {
            throw new InvalidArgumentException("Number of columns and data elements must match");
        }


        // Prepare the SQL statement
        $columnNames = implode(', ', $columns);
        $valuePlaceholders = ':' . implode(', :', $bindingArray);
        $sql = "INSERT INTO $tableName ($columnNames) VALUES ($valuePlaceholders)";
        // echo "SQL Query: " . $sql . "<br>";

        $stmt = $pdo->prepare($sql);
        $dataKeys = array_keys($data);
        $dataValues = array_values($data);

        for ($i = 0; $i < count($dataKeys); $i++) {
            $column = $dataKeys[$i];
            $values = $dataValues[$i];
            $index = $i;
            if (isset($bindingArray[$index])) {
                // Bind the value using index position
                $stmt->bindValue(':' . $bindingArray[$index], $values);
                // var_dump($bindingArray[$index], $values);
            }
        }

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function updateData(PDO $pdo, string $tableName, array $columns, array $data, string $whereColumn, $whereValue)
    {
        // var_dump(count($columns), count($data));
        // Check if the number of columns and data elements match
        if (count($columns) !== count($data)) {
            throw new InvalidArgumentException("Number of columns and data elements must match");
        }

        $setClause = '';
        $bindingArray = [];
        foreach ($columns as $column) {
            $setClause .= "$column = :$column, ";
            $bindingArray[] = $column;
        }
        $setClause = rtrim($setClause, ', ');

        $sql = "UPDATE $tableName SET $setClause WHERE $whereColumn = :whereValue";

        try {
            $stmt = $pdo->prepare($sql);
            // var_dump($stmt);
            for ($i = 0??1; $i < count($data); $i++) {
                $stmt->bindValue(':' . $bindingArray[$i], $data[$i]);
                // var_dump(':' . $bindingArray[$i], $data[$i]);
            }
            $stmt->bindValue(':whereValue', TRIM($whereValue));
            // var_dump(':whereValue', $whereValue);
            // var_dump($sql);


            $stmt->execute();
            return true;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }


    public function deleteData(PDO $pdo, string $tableName, string $whereColumn, $whereValue)
    {
        $sql = "DELETE FROM $tableName WHERE $whereColumn = :whereValue";

        try {
            $stmt = $pdo->prepare($sql);

            $stmt->bindValue(':whereValue', $whereValue);
            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }


            // var_dump($stmt);
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }
}
