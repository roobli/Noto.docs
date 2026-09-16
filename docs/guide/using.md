# Using Noto

Open a file with `Cmd+O`, or open a folder with `Cmd+Alt+O` to get the
workspace tree. Open notes sit behind a quiet Recent strip in the status bar
rather than a classic tab bar. The rail on the left holds Files and Outline by
default; Links (graph / related) stays off until you turn it on in Settings →
Appearance. The one control at the top left opens and closes the rail, and
`Cmd+Shift+L` and `Cmd+Shift+O` open it directly on the view they name.
`Cmd+F` finds, `Cmd+Alt+F` finds and replaces, `Cmd+K` opens the command
palette, and `Cmd+,` opens Settings (and closes it again) — a full-page shell with
categories, where plugins are turned on under the Plugins section. On Windows and Linux, read
Control for Command.

The title bar carries the filename and nothing else that is not an action you
can take right now: Save appears when there is something to save and is absent
when there is not. The gear is the single Settings entry; Plugins is reached
from Settings' left nav, not a second top-bar icon.

Settings carries the document's typography, so text size, line height and
line width are yours to set rather than fixed: the width is a character count,
not a pixel width, so it holds as the size changes. Saving automatically is
there too, off by default and debounced against typing, and it refuses in
exactly the cases the Save button refuses. A custom stylesheet can be pointed at
any absolute path and wins over the built-in theme, so `:root { --accent: … }`
is enough to retheme the app without editing it. See [Theming](./theming).

`Cmd+P` is quick open: type part of a note's name or its path and it ranks the
whole folder by how well it matches and by how often and how recently you open
it, so an empty box already shows the few notes you probably want. `Enter`
opens the note; `Alt+Enter` writes a `[[wiki link]]` to it at the caret instead.
Wiki links render inline wherever they appear, and `Cmd+click` follows one.

The links are decorations rather than a node type, so they cannot reach the
saved bytes: `[[a note]]` is ordinary text in the file, exactly as you typed it.

`Cmd+Shift+F` searches inside the notes rather than across their names, and
`Tab` switches between the two without leaving the box. A content result shows
the lines it was found on, and opening one lands on the match with the find bar
already carrying the query.

The open folder names itself on the tree's first row; an ellipsis on that
row holds what acts on the folder: open another, reveal it in the file manager,
refresh, and the folders you opened before. `Cmd+Shift+R` reveals the current
note instead.

`Cmd+/` opens Source Code Mode: the whole note as the Markdown it is saved as,
the way Typora's Command-slash does. `Cmd+Alt+/` still toggles source for the
single block under the caret, which is the escape hatch when you want to fix
one paragraph, one table or one fence without leaving the rest rendered.

Markdown input rules work as you type: `#` for a heading, `-` for a list,
`` ``` `` for a code fence. The syntax markers for the block you are editing
appear while you are in it and fold away when you leave, so the document stays
readable without hiding what it is made of.

## Byte-exact saving

This is the property the rest of the design is arranged around. Most editors
that render Markdown round-trip it through a serializer, so opening and saving
a file rewrites parts of it you never touched: a list marker changes, emphasis
switches from `_` to `*`, a table's padding is normalized, trailing whitespace
disappears.

Noto parses the file into blocks, records the exact source bytes of each one
along with its origin and hash, and on save writes back the recorded bytes for
every block that was not edited. Only blocks you actually changed are
serialized. A document you open and save without touching is identical to the
byte.

The same block record is what detects an external change: if the file on disk
no longer matches what was accepted, the save is refused and you are offered a
copy rather than an overwrite.
