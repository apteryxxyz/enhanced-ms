const assert = require('assert'),
    ms = require('../')

describe('ms(number)', function () {
    describe('ms(2000)', function () {
        it('should return the written form of 2000 milliseconds', function () {
            assert(ms(2000), '2s');
        })
    })

    describe('ms(93784005)', function () {
        it('should return the written form of 93784005 milliseconds', function () {
            assert(ms(93784005), '1d 2h 3m 4s 5ms')
        })
    })

    describe('ms(3600000, { long: true })', function () {
        it('should return the long written form of 3600000 milliseconds', function () {
            assert(ms(3600000, { long: true }), '1 hour');
        })
    })

    describe('ms(43200000, { raw: true })', function () {
        it('should return the raw parsed milliseconds object', function () {
            assert(ms(43200000, { raw: true }), ms.parse(43200000));
        })
    })
})

describe('ms(string)', function () {
    describe('ms(\'2s\')', function () {
        it('should return 2 seconds in milliseconds', function () {
            assert(ms('2s'), 2000);
        })
    })

    describe('ms(\'10 hours 46 minutes 5 seconds\')', function () {
        it('should return 10 houts 46 minutes and 5 seconds in milliseconds', function () {
            assert(ms('10 hours 46 minutes 5 seconds'), 38765000);
        })
    })
})

describe('ms(ms(number))', function () {
    describe('ms((123456789))', function () {
        it('should return what is inputted', function () {
            assert(ms((123456789)), 123456789)
        })
    })
})

describe('ms(ms(string))', function () {
    describe('ms((\'2mo 10d 12h\'))', function() {
        it('should return almost exactly what was inputted, just formatted differently', function () {
            assert(ms(('2mo 10d 12h')), '70d 12h')
        })
    })
})