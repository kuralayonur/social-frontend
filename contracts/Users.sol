pragma solidity ^0.5.0;

contract Social {
    struct Posts {
        uint id;
        string title;
        string ipfs_hash;
        string image_hash;
        uint vote;   
    }
    struct Users {
        uint id;
        string userName;
        string password;
        string email;
        string etherwallet;
    }
    

}
