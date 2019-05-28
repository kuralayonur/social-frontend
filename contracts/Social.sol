pragma solidity ^0.5.0;

contract Social {
    struct Posts {
        string id;
        string title;
        string ipfs_hash;
        string image_hash;
        uint vote;   
    }
    struct Users {
        string id;
        uint level;
        uint reputation;
        string userName;
        string password;
        string email;
        string etherwallet;

    }
    struct Comments {
        string id;
        string post_id;
        string user_name;
        uint vote;
        string comment_hash;
    }
    mapping (uint256 => Users) public user;
    mapping (uint256 => Comments) public comment;
    mapping (uint256 => Posts) public post;
    uint256 total_post = 0;
    uint256 total_user = 0;
    uint256 total_comment = 0;

    // event InsertUserEvent(uint _id, string _username, string password, string _email, string _etherwallet);

    function InsertUser
    (string memory _id,string memory _username,string memory _password,string memory _email,string memory _etherwallet,uint _level,
        uint _reputation) public payable {
        total_user++;
        user[total_user] = Users(_id, _level, _reputation, _username, _password, _email, _etherwallet);      
    }
    function InsertComment(string memory id, string memory post_id,string memory user_name,uint vote,string memory comment_hash) public payable {
        total_comment++;
        comment[total_comment] = Comments(id,post_id,user_name,vote,comment_hash);
    }
    function InsertPost(string memory id, string memory title, string memory ipfs_hash, string memory image_hash, uint vote) public payable {
        total_post++;
        post[total_post] = Posts(id,title,ipfs_hash,image_hash,vote);
    }

}
