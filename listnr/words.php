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
                <button type="submit">Search</button>
                <input type="text" name="search" value="<?php if (isset($_GET['search'])){echo $_GET['search'];} ?>" 
            </div>
        </form>
    </div
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

                if(isset($_GET['search'])) {
                    $filter = $_GET['search'];
                    $sql = "SELECT * FROM `words` WHERE `word` LIKE '%$filter%' or `wordEnglish` LIKE '%$filter%'";
                        $result = $conn->query($sql);
                        
                        if (!$result) {
                            die("Invalid query:" . $conne->error);
                        }
                } elseif(isset($_GET['addWord'])) {
                    // this is the one that doesn't work
                    // add a new word to list, not including translation
                    $newWord = $_GET['addWord'];
                    $sql = "INSERT INTO words (word) VALUES ('$newWord')";
                    $result = $conn->query($sql);
                        
                        if (!$result) {
                            die("Invalid query:" . $conne->error);
                        }

                } else {
                    $sql = "SELECT * FROM words";
                        $result = $conn->query($sql);
                        
                        if (!$result) {
                            die("Invalid query:" . $conne->error);
                        }
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
                <input type="text" name="newWord" value="<?php if (isset($_GET['newWord'])){echo $_GET['newWord'];} ?>" 
            </div>
        </form>
    </div
    
</body>
</html>
