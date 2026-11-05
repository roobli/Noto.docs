# Using Noto

Open a file with `Cmd+O`, or open a folder with `Cmd+Alt+Shift+O` to get the
workspace tree. Open notes sit behind a quiet Recent strip in the status bar
rather than a classic tab bar. The rail on the left holds Files and Outline by
default; Links (graph / related) stays off until you turn it on in Settings →
Appearance. The one control at the top left opens and closes the rail, as does
`Cmd+Shift+L`, and `Cmd+Shift+O` opens it on Outline.
`Cmd+F` finds, `Cmd+Alt+F` finds and replaces, `Cmd+Shift+P` opens the command
palette (`Cmd+K` inserts a link, as in Typora), and `Cmd+,` opens Settings and
closes it again. Settings fills the window, with its panes grouped under
General and Advanced: Plugins turns plugins on and installs new ones, and
Shortcuts lists every key the app answers to, with a switch to free each one.
On Windows and Linux, read Control for Command, except for three keys those
systems already use: Inline Math is `Alt+Shift+M`, Toggle Task Status
`Alt+Shift+X`, and Close Window `Ctrl+Shift+W`.

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
refresh (also `Cmd+Alt+R`), and the folders you opened before. `Cmd+Shift+R`
reveals the current note instead. The button beside the rail's search shuts
every folder except the ones leading to the note in front. File → New Note
makes the note beside the one in front and asks for its name on its row.

While a note has unsaved changes, its name in the title bar opens them, side
by side, stacked or inline, with the changed words marked. Close Tab, closing
the window and quitting ask before unsaved changes would be lost. In a folder
under git, the tree marks changed notes and a bar beside each block shows what
changed since the last commit; View → Show Git Changes hides both for a clean
screenshot. The icon beside the rail's search, with a count, turns the rail to
Changes: only the notes that differ from the last commit, as one short tree,
changed, new and deleted each with its own mark, and a chain of folders holding
only the next drawn as one row. A click opens a note, and a right click gives
it the same menu as in the file tree; a rename is typed on its row in the tree,
and the rail comes back to Changes after. Changes is a bundled plugin and can
be switched off in Settings → Plugins.

In a folder that keeps memory, one with a `.noto/` folder in it, Noto writes
down each note you bring to the front, and the note you followed a link from,
one line per open in `.noto/events/<computer>/<year-month>.jsonl`. Nothing else
is written, and Noto sends nothing anywhere; the lines stay in your folder
(whether they go into git is up to you) for
[the vault tools](https://github.com/roobli/vault) to tell which notes are warm
and which you think of together. A folder without `.noto/` is never written
to. To forget, delete `.noto/events/`; the vault tools let go of it at their
next full rebuild.

`Cmd+/` opens Source Code Mode: the whole note as the Markdown it is saved as,
the way Typora's Command-slash does. `Cmd+Alt+/` still toggles source for the
single block under the caret, which is the escape hatch when you want to fix
one paragraph, one table or one fence without leaving the rest rendered.
Undo there steps through the text a typed run at a time, and leaving the mode
always shows what the text says.

Markdown input rules work as you type: `#` for a heading, `-` for a list,
`` ``` `` for a code fence, and an HTML tag such as `<span class="sidenote">`
becomes a tag as soon as its `>` is typed. A block's markers, such as a heading's `#`,
appear while the caret is in it and fold away when it leaves, and an inline
mark's, such as `**` or a link's brackets, only while the caret is inside that
span, so the line does not shift as you click into it. The document stays
readable without hiding what it is made of.

The caret is drawn by Noto, two pixels in the accent, solid while you type and
breathing once it rests, so it is easy to find in a page of text; Reduce
Motion keeps it still. A click anywhere in the page around the text puts it in
the note at the nearest place. Copying inside one block copies what you
selected and nothing around it: ten words from a table cell come out as ten
words, part of a code block as its code. Rich text pasted from ChatGPT,
GitHub, a documentation site or Google Docs is tidied into what a note holds
(code keeps its language, a formula comes in as its TeX), and when the tidy
took anything out the status line says what, with Paste as text to put the
plain text in instead. A code block that names no language is coloured as the
one it reads as, marked `auto` in its corner until you choose; the corner
opens a searchable list of languages, and `Cmd+A` inside a block selects its
code first. A table's tools stand in the right margin while the caret is in
it. To write a sidenote, select the words and choose Add Sidenote from the
right-click menu or press `Cmd+Alt+S`: a card opens in the margin beside the
line, Enter keeps the note and Escape leaves nothing behind, and the file
stays readable in Typora.

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
