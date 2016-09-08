jest.autoMockOff();
describe('Collection utilities module', function() {
    var CollectionUtils = require('../CollectionUtils')

    var collectionTweetsMock = {
        collectionTweet7 : {},
        collectionTweet8 : {},
        collectionTweet9 : {}
    }

    it('returns a number of tweets in collection', function getNumberOfTweetsInCollection() {
        var actualNumberOfTweetsInCollection = CollectionUtils.getNumberOfTweetsInCollection(collectionTweetsMock);
        var expectedNumberOfTweetsInCollection = 3;
        expect(actualNumberOfTweetsInCollection).toBe(expectedNumberOfTweetsInCollection);
    });

    it('checks if collection is not empty', function isNotEmptyCollection() {
        var actualIsEmptyCollection = CollectionUtils.isEmptyCollection(collectionTweetsMock);

        expect(actualIsEmptyCollection).toBeDefined(); // expect가 undefined 외의 다른것을 반환해야 한다.
        expect(actualIsEmptyCollection).toBe(false);   //expect가 false이어야 함.
        expect(actualIsEmptyCollection).not.toBe(true);//expect를 not한값이 true가 되어야 한다.
    });



});