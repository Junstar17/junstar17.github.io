var relationship1 = {
    name: 'zero',
    friend: ['nero','hero','xero'],
    logFriends: function() {
        var that = this;
        this.friend.forEach((friend) => {
            console.log(this.name, friend)
        })
    }
}
relationship1.logFriends();