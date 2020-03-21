class FriendsList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name) {
    console.log(`${name} is now a friend!`);
  }

  removeFriend(name) {
    const ind = this.friends.indexOf(name);

    if (ind === -1) {
      throw new Error('Friend not found!');
    }

    this.friends.splice(ind, 1);
  }
}

describe('FriendsList', () => {
  let friendsList;

  beforeEach(() => {
    friendsList = new FriendsList();
  });

  it('initialize friends', () => {
    expect(friendsList.friends.length).toEqual(0);
  });

  it('add friend', () => {
    friendsList.addFriend('hanna');
    expect(friendsList.friends.length).toEqual(1);
  });

  it('announces friendship', () => {
    friendsList.announceFriendship = jest.fn();
    expect(friendsList.announceFriendship).not.toHaveBeenCalled();
    friendsList.addFriend('hanna');
    expect(friendsList.announceFriendship).toHaveBeenCalledWith('hanna');
  });

  describe('removeFriend', () => {
    it('removes a friend fro the list', () => {
      friendsList.addFriend('Ariel');
      expect(friendsList.friends[0]).toEqual('Ariel');
      friendsList.removeFriend('Ariel');
      expect(friendsList[0]).toBeUndefined();
    });

    it('throws an error cause the friend does not exist', () => {
      expect(() => friendsList.removeFriend('Ariel')).toThrow(new Error('Friend not found!'));
    });
  });
});
