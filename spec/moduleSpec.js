import * as JS360 from '../src/module';

describe('main module file', () => {
    it('should define "JS360" object with "generate360view" function', () => {
        expect(window.JS360.generate360view).toBeDefined();
    });

    it('should return JS360 object with "generate360view" function', () => {
        expect(JS360.generate360view).toBeDefined();
    });
});
