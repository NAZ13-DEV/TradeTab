
<?php
	require_once '../php_article_validation/DbConnection.php';
/**
 * 
 */
class files Extends DbConnect
{
	private $id;
	private $fileName;
	private $filePath;
	private $fileType;
	private $fileSize;
	private $fileExtention = ['png', 'jpeg', 'jpg', 'gif', '3gp', 'mp4', 'mp3', 'wmp'];

	public static $time;
	private $dbConn;

	function setId($id)
	{
		if (verified_id($id)) {
			$this->id = $id;
		}else{
			return false;
		}
	}

	function getId() { return $this->id; }

	public static function setDateTime()
	{
		self::$time = date('d/M/Y h:i:s a', time());
	}
	
	public static function getDateTime()
	{
		return self::$time;
	}

	public function setFileName($fileData)
	{
		$fileName = date('dmYHis').str_replace(" ", "", basename($fileData));
			$this->fileName = $fileName;
	}

	public function getFileName() { return $this->fileName; }

	// function setFilePath($filedata)
	// {
	// 	$filePath = "images/". basename(addslashes($filedata));
	// 	$this->filePath = $filePath;
	// }

	// function getFilePath() { return $this->filePath; }

	function setFileType($fileName)
	{
		$dir = "images/";
		$target_file = $dir.basename(addslashes($fileName));
		$fileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
		$this->fileType = $fileType;
	}

	function getFileType() { return $fileType; }

	function setFileSize($fileSize) 
	{
		$this->fileSize = $fileSize;
	}

	function getFileSize() { return $this->fileSize; }

	public function __construct()
	{
		$db = new DbConnect();
		$this->dbConn = $db->connect();
	}

	public function checkExtention($fileType)
	{
		if (in_array($fileType, $this->fileExtention)) {
			$this->fileExtention = $fileExtention;
		}else{
			return false;
		}
	}

	public function verified_id($id)
    {
        if (filter_var($id, FILTER_SANITIZE_NUMBER_INT) == TRUE) {
            return $id;
        }else{
            return FALSE;
        }
    }

    public function insert()
    {
    	$stmt = $this->dbConn->prepare("INSERT INTO `files` (`name`,`type`,`size`,`udate`) VALUES (:name, :type, :size, :udate)");

		$stmt->bindParam(':name', $this->fileName);
		$stmt->bindParam(':type', $this->fileType);
		$stmt->bindParam(':size', $this->fileSize);
		$stmt->bindParam(':udate', self::$time);

		if ($stmt->execute()) {
			return true;
		}else{
			return false;
		}
    }

    public function getFiles()
    {
    	 $stmt = $this->dbConn->prepare("SELECT * FROM `files`");
    	 if ($stmt->execute()) {
    	 	$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    	 	return $data;
    	 }else{
    	 	return FALSE;
    	 }
    }
}
