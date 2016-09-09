(function () {
  'use strict';

  describe('', function () {
    describe('#beatToTimestamp(bpm, beat)', function () {

      it('should give [0, 0, 0, 0] for any bpm when the beat is 1', function () {
        beatToTimestamp(bpm = 60, beat = 0).should.equal([0,0,0,0]);
        beatToTimestamp(bpm = 123, beat = 0).should.equal([0,0,0,0]);
        beatToTimestamp(bpm = 15, beat = 0).should.equal([0,0,0,0]);
      });

      it('should pass these easy tests at 60bpm', function() {
        beatToTimestamp(bpm = 60, beat = 4).should.equal([0,0,4,0]);
        beatToTimestamp(bpm = 60, beat = 8).should.equal([0,0,8,0]);
        beatToTimestamp(bpm = 60, beat = 60).should.equal([0,1,0,0]);
        beatToTimestamp(bpm = 60, beat = 61).should.equal([0,1,1,0]);
      });

      it('should ', function() {
        beatToTimestamp(bpm = 60, beat = 5).should.equal([0,0,4,0]);
        beatToTimestamp(bpm = 60, beat = 9).should.equal([0,0,8,0]);
        beatToTimestamp(bpm = 60, beat = 13).should.equal([0,0,12,0]);
        beatToTimestamp(bpm = 60, beat = 61).should.equal([0,2,0,0]);
      });      

    });
  });
})();
