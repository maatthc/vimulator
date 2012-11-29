describe("InsertMode", function () {
    describe(".name", function () {
        it("is insert", function () {
            var im = new Vimulator.InsertMode();
            expect(im.name).toBe("insert");
        });
    });

    describe(".keyPress", function () {
        var vim, im;

        beforeEach(function () {
            vim = jasmine.createSpyObj("vim", [
                "moveCursorRelative",
                "setMode",
                "appendText"
            ]);
            im = new Vimulator.InsertMode(vim);
        });

        it("leaves normal mode when pressing escape", function () {
            im.keyPress(ESC);
            expect(vim.setMode).toHaveBeenCalledWith("normal");
            expect(vim.moveCursorRelative).toHaveBeenCalledWith(0, -1);
        });

        it("inserts printable characters", function () {
            var chars, chr, i;

            chars = ["a", "1", "~"];
            for (i = 0; i < chars; i +=1) {
                chr = chars[i];
                im.keyPress(chr);
                expect(vim.appendText).toHaveBeenCalledWith(chr);
            }
        });
    });
});
