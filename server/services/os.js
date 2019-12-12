_out.println(_os.command("cd .. && ls -lart \"protect.sh\"").output)
_out.println(_os.command("ls -lart", "sdsfd").output)
_out.println(
    _os.command("pwd").output
)

var os = _os.init()
os.directory("/root")
os.command("ls").output
