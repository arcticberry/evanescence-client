!(function (t) {
  "use strict";
  function o() {
    (this.$body = t("body")),
      (this.$todoContainer = t("#todo-container")),
      (this.$todoMessage = t("#todo-message")),
      (this.$todoRemaining = t("#todo-remaining")),
      (this.$todoTotal = t("#todo-total")),
      (this.$archiveBtn = t("#btn-archive")),
      (this.$todoList = t("#todo-list")),
      (this.$todoDonechk = ".todo-done"),
      (this.$todoForm = t("#todo-form")),
      (this.$todoInput = t("#todo-input-text")),
      (this.$todoBtn = t("#todo-btn-submit")),
      (this.$todoData = [
        { id: "1", text: "Design One page theme", done: !1 },
        { id: "2", text: "Build a js based app", done: !0 },
        { id: "3", text: "Creating component page", done: !0 },
        { id: "4", text: "Testing??", done: !0 },
        { id: "5", text: "Hehe!! This looks cool!", done: !1 },
        { id: "6", text: "Create new version 3.0", done: !1 },
        { id: "7", text: "Build an angular app", done: !0 },
      ]),
      (this.$todoCompletedData = []),
      (this.$todoUnCompletedData = []);
  }
  (o.prototype.markTodo = function (t, o) {
    for (var e = 0; e < this.$todoData.length; e++)
      this.$todoData[e].id == t && (this.$todoData[e].done = o);
  }),
    (o.prototype.addTodo = function (t) {
      this.$todoData.push({ id: this.$todoData.length, text: t, done: !1 }),
        this.generate();
    }),
    (o.prototype.archives = function () {
      this.$todoUnCompletedData = [];
      for (var t = 0; t < this.$todoData.length; t++) {
        var o = this.$todoData[t];
        1 == o.done
          ? this.$todoCompletedData.push(o)
          : this.$todoUnCompletedData.push(o);
      }
      (this.$todoData = []),
        (this.$todoData = [].concat(this.$todoUnCompletedData)),
        this.generate();
    }),
    (o.prototype.generate = function () {
      this.$todoList.html("");
      for (var t = 0, o = 0; o < this.$todoData.length; o++) {
        var e = this.$todoData[o];
        1 == e.done
          ? this.$todoList.prepend(
              '<li class="list-group-item border-0 pl-0"><div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input todo-done" id="' +
                e.id +
                '" checked><label class="custom-control-label" htmlFor="' +
                e.id +
                '"><s>' +
                e.text +
                "</s></label></div></li>"
            )
          : ((t += 1),
            this.$todoList.prepend(
              '<li class="list-group-item border-0 pl-0"><div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input todo-done" id="' +
                e.id +
                '"><label class="custom-control-label" htmlFor="' +
                e.id +
                '">' +
                e.text +
                "</label></div></li>"
            ));
      }
      this.$todoTotal.text(this.$todoData.length), this.$todoRemaining.text(t);
    }),
    (o.prototype.init = function () {
      var o = this;
      this.generate(),
        this.$archiveBtn.on("click", function (t) {
          return t.preventDefault(), o.archives(), !1;
        }),
        t(document).on("change", this.$todoDonechk, function () {
          this.checked
            ? o.markTodo(t(this).attr("id"), !0)
            : o.markTodo(t(this).attr("id"), !1),
            o.generate();
        }),
        this.$todoForm.on("submit", function (t) {
          return (
            t.preventDefault(),
            "" == o.$todoInput.val() ||
            void 0 === o.$todoInput.val() ||
            null == o.$todoInput.val()
              ? (o.$todoInput.focus(), !1)
              : (o.addTodo(o.$todoInput.val()),
                o.$todoForm.removeClass("was-validated"),
                o.$todoInput.val(""),
                !0)
          );
        });
    }),
    (t.TodoApp = new o()),
    (t.TodoApp.Constructor = o);
})(window.jQuery),
  (function () {
    "use strict";
    window.jQuery.TodoApp.init();
  })();
