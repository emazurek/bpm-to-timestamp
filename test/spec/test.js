(function () {
  'use strict';

  describe('BpmTimestamp:', function () {
    describe('#beatToTimestamp(bpm, beat, timeStartArr = [0,0,0,0])', function () {
      var instance = new BpmTimestamp();

      it('should give [0, 0, 0, 0] for any bpm when the beat is 1', function () {
        instance.beatToTimestamp(60, 0).should.deep.equal([0,0,0,0]);
        instance.beatToTimestamp(123, 0).should.deep.equal([0,0,0,0]);
        instance.beatToTimestamp(15, 0).should.deep.equal([0,0,0,0]);
      });

      it('should pass these easy tests at 60bpm', function() {
        instance.beatToTimestamp(60, 4).should.deep.equal([0,0,4,0]);
        instance.beatToTimestamp(60, 60).should.deep.equal([0,1,0,0]);
        instance.beatToTimestamp(60, 61).should.deep.equal([0,1,1,0]);
        instance.beatToTimestamp(60, 3600).should.deep.equal([1,0,0,0]);
      });

      it('should shift the array when supplied a timeStartArr', function() {
        instance.beatToTimestamp(60, 5).should.deep.equal([0,0,4,0]);
        instance.beatToTimestamp(60, 9).should.deep.equal([0,0,8,0]);
        instance.beatToTimestamp(60, 13).should.deep.equal([0,0,12,0]);
        instance.beatToTimestamp(60, 61).should.deep.equal([0,2,0,0]);
      });      

    });

    describe('#stringTimestampToArray(str)', function() {

    });
  });
})();
