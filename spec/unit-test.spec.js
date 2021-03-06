"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
describe("When no initial state", () => {
    it("initial state should be empty", () => {
        const undoable = new __1.Undoable();
        expect(undoable.value).toBeUndefined();
        expect(undoable.canRedo).toBe(false);
        expect(undoable.canUndo).toBe(false);
        expect(undoable.undo()).toBeUndefined();
        expect(undoable.redo()).toBeUndefined();
    });
});
describe("When initial state set to string", () => {
    it("should have 1 item after pushing a value", () => {
        const undoable = new __1.Undoable("");
        undoable.value = "a";
        expect(undoable.value).toBe("a", "current should be a");
        expect(undoable.canRedo).toBe(false);
        expect(undoable.canUndo).toBe(true);
        expect(undoable.redo()).toBeUndefined();
        expect(undoable.undo()).toBe("");
    });
    it("should return 1 item when undo", () => {
        const undoable = new __1.Undoable("");
        let s = "a";
        undoable.value = s;
        s = "ab";
        undoable.value = s;
        s = undoable.undo();
        expect(s).toBe("a", "Undo should return a");
        expect(undoable.value).toBe("a");
        expect(undoable.canRedo).toBe(true);
        expect(undoable.canUndo).toBe(true);
        expect(undoable.undo()).toBe("");
    });
    it("should return item when redo with 2 items", () => {
        const undoable = new __1.Undoable("");
        let s = "a";
        undoable.value = s;
        s = "ab";
        undoable.value = s;
        s = "abc";
        undoable.value = s;
        s = undoable.undo();
        expect(s).toBe("ab");
        s = undoable.redo();
        expect(s).toBe("abc");
        expect(undoable.value).toBe("abc");
        expect(undoable.canRedo).toBe(false);
        expect(undoable.canUndo).toBe(true);
    });
});
describe("When initial state set to object with clone", () => {
    it("should have 1 item after pushing a value", () => {
        const obj = { s: "" };
        const undoable = new __1.Undoable(obj, true);
        undoable.value = { s: "a" };
        expect(undoable.value).toEqual({ s: "a" }, "current should be a");
        expect(undoable.canRedo).toBe(false);
        expect(undoable.canUndo).toBe(true);
        expect(undoable.redo()).toBeUndefined();
        expect(undoable.undo()).toEqual({ s: "" });
    });
    it("changing original object shouldn't change value", () => {
        const obj = { s: "" };
        const undoable = new __1.Undoable(obj, true);
        undoable.value = { s: "a" };
        expect(undoable.value).toEqual({ s: "a" }, "current should be a");
        obj.s = "abc";
        expect(undoable.value).toEqual({ s: "a" });
        undoable.value = obj;
        expect(undoable.value).toEqual({ s: "abc" }, "current should be abc");
        expect(undoable.undo()).toEqual({ s: "a" });
        expect(undoable.redo()).toEqual({ s: "abc" });
    });
});
