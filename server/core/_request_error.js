
if (!_out.isClosed()) {
    _out.print(
        "### SERVER ERROR ###"
    )
    /*
    // Is insecure but the code below will print errors with more details...
    _out.print(
        "SERVER ERROR # " +
        _error.getString("file")
        +":"+
        _error.getString("line")
        +" # "+
        _error.getString("message")
    )
     */
}
