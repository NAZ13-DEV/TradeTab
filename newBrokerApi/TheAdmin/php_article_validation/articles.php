<?php
	require_once 'DbConnection.php';
/**
 * 
 */
class Articles Extends DbConnect 
{
	private $id;
	private $title;
	private $description;
	private $author;
	private $file;
	private $cat;
	// private $createdOn;
	private $dbConn;

	public static $createdOn;

	function setId($id) 
	{
		$this->id = $id;
	}

	function getId()
	{
		return $this->id;
	}
	function setTitle($title)
	{
		$this->title = $title;
	}
	function getTitle()
	{
		return $this->title;
	}
	function setDescription($description)
	{
		$this->description = $description;
	}
	function getDescription()
	{
		return $this->description;
	}
	function setCat($Cat)
	{
		$this->category = $Cat;
	}
	function getCat()
	{
		return $this->category;
	}
	function setAuthor($author)
	{
		$this->author = $author;
	}
	function getAuthor()
	{
		return $this->author;
	}
	function setFile($file)
	{
		$this->file = $file;
	}
	public function getFile()
	{
		return $this->file;
	}

	static public function setDateTime()
	{
		self::$createdOn = date('d/M/Y h:i:s a', time());
	}

	static public function getDateTime()
	{
		return self::$createdOn;
	}

	public function __construct()
	{
		$db = new DbConnect();
		$this->dbConn = $db->connect();
	}

	public function save()
	{
		$sql = "INSERT INTO `dash-post`(`id`,`title`,`post`,`posted`,`img`) VALUES (null,:title,:descp, :cdate,:file)";
		$stmt = $this->dbConn->prepare($sql);
		$stmt->bindParam(':title', $this->title);
		$stmt->bindParam(':descp', $this->description);
		// $stmt->bindParam(':author', $this->author);
		$stmt->bindParam(':cdate', self::$createdOn);
		// $stmt->bindParam(':cat', $this->category);
		$stmt->bindParam(':file', $this->file);
		if ($stmt->execute()) {
			return true;
		}else{
			return false;
		}
	}

	public function update()
	{
		$stmt = $this->dbConn->prepare("UPDATE `dash-post` SET `title` = :title, `post` = :descp, `admin_id` = :author, `posted` = :cdate, `category` = :cat WHERE `id` = :id");
		
		$stmt->bindParam(':id', $this->id);
		$stmt->bindParam(':title', $this->title);
		$stmt->bindParam(':descp', $this->description);
		$stmt->bindParam(':author', $this->author);
		$stmt->bindParam(':cdate', self::$createdOn);
		$stmt->bindParam(':cat', $this->category);
		

		if ($stmt->execute()) {
			return true;
		}else{
			return false;
		}
	}

	public function getArticleById()
	{
		$stmt = $this->dbConn->prepare("SELECT * FROM `dash-post` WHERE id = :id");
		$stmt->bindParam(':id', $this->id);
		$stmt->execute();
		$article = $stmt->fetch(PDO::FETCH_ASSOC);
		return $article;
	}

	public function getuser()
	{
		$stmt = $this->dbConn->prepare("SELECT * FROM `dash-post` WHERE admin_id = :author");
		$stmt->bindParam(':author', $this->author);
		$stmt->execute();
		$art = $stmt->fetch(PDO::FETCH_ASSOC);
		return $art;
	}
	
	public function getAllarticles()
	{
		$stmt = $this->dbConn->prepare("SELECT * FROM `dash-post` ORDER BY id DESC");
		$stmt->execute();
		$articles = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return $articles;
	}

}

