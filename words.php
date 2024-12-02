<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Listnr</title>
        <link rel="stylesheet" href="css/styles.css">
        <script defer src="js/nav.js"></script>
    </head>
<body>
    <div class="header">
        <div class="title-section">
            <h1>Listnr:</h1>
        </div>
        <nav id="nav">
            <!-- js nav here -->
        </nav>
    </div>

    <!-- <div class="listContainer">
        <ul>
            <li class="listTitle">Choose A List</li>
            <li><a href="">A List</a></li>
            <li><a href="">A List</a></li>
            <li><a href="">A List</a></li>
            <li><a href="">A List</a></li>
        </ul>
    </div> -->

    <div class="wordSearch">
        <form action="" method="GET">
            <div>
                <button type="submit">Search Word</button>
                <input type="text" name="searchWord" value="<?php if (isset($_GET['searchWord'])){echo $_GET['searchWord'];} ?>">
            </div>
        </form>
    </div>
    <div class="tagSearch">
        <form action="" method="GET">
            <div>
                <button type="submit">Search Tag</button>
                <input type="text" name="searchTag" value="<?php if (isset($_GET['searchTag'])){echo $_GET['searchTag'];} ?>">
            </div>
        </form>
    </div>
    <br>

    <div class="container" id="library">
        <table>
            <thead>
                <th>Word</th>
                <th>Translation</th>
                <th>Definition</th>
                <th>Type</th>
                <th>Tags</th>
                <th>Pronounciation</th>
            </thead>
            <tbody class="scrollable">
                <?php
                require 'php/config.php';

                if(isset($_GET['searchWord'])) {
                    $filter = $_GET['searchWord'];
                    $sql = "SELECT * FROM `words` WHERE `word` LIKE '%$filter%' or `wordEnglish` LIKE '%$filter%'";
                        
                } elseif(isset($_GET['searchTag'])) {
                    $filter = $_GET['searchTag'];
                    $sql = "SELECT * FROM `words` WHERE `wordTags` LIKE '%$filter%' or `wordEnglish` LIKE '%$filter%'";
                } elseif(isset($_GET['addWord'])) {
                    // this is the one that doesn't work
                    // add a new word to list, not including translation
                    $newWord = $_GET['addWord'];
                    $sql = "INSERT INTO words (word) VALUES ('$newWord')";
                    

                } else {
                    $sql = "SELECT * FROM words";
                       
                }       

                $result = $conn->query($sql);
                if (!$result) {
                    die("Invalid query:" . $conne->error);
                }


                //read data of each row
                while($row = $result->fetch_assoc()) {
                    echo "
                        <tr>
                            <td>" . $row["word"] . "</td>
                            <td>" . $row["wordEnglish"] . "</td>
                            <td>" . $row["wordDefinition"] . "</td>
                            <td>" . $row["wordType"] . "</td>
                            <td>" . $row["wordTags"] . "</td>
                            <td>" . $row["wordPronunciation"] . "</td>
                        </tr>
                    ";
                }
                ?>
            </tbody>
        </table>
    </div>

    <br>
    <div class="wordAdd">
        <form action="" method="GET">
            <div>
                <button type="submit">Add Word</button>
                <input type="text" name="newWord" value="<?php if (isset($_GET['newWord'])){echo $_GET['newWord'];} ?>"> 
            </div>
        </form>
    </div>
    
</body>
</html>
