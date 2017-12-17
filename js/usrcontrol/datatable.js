;(function() {
    
    // Define constructor
    this.DataTable = function() {

        // Create global element references
        this.table = null;
        this.thead = null;
        this.tbody = null;
        this.tfoot = null;
        this.arrMapCols = [];
        this.numRow = null;
        
        
        // Define option defaults
        var defaults = {
            Id: '',
            CssClass: 'pure-table',
            Style = 'table-layout: fixed; word-wrap: break-word;',
            Width = '95%',
            source: null,
            AutoGenerateColumns: false
        }

        // Create options by extending defaults with the passed in arugments
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

    }

    // Public methods
    Wizard.prototype.open = function() {
        // open code goes here
        buildOut.call(this);

        //initializeEvents.call(this);
    }

    function buildOut() { 

        this.table = document.getElementById('tbl_' + this.options.Id);
        if(this.table!=null) {
        	document.getElementById(this.options.Id).removeChild(this.table);
        }
        this.table = document.createElement('table');
        this.table.setAttribute('id','tbl_' + this.options.Id);

        this.thead = document.createElement('thead');
        this.tbody = document.createElement('tbody');

        this.numRow = 0;
        var cellTbl = 0;
        
        var c = document.getElementById(this.options.Id).children;
        var txt = "";
        var i;
        
        this.arrMapCols = [];
        
        for (i = 0; i < c.length; i++) {
            var div = c[i];
            if(div.attributes.id != undefined)
            switch(div.attributes.id.value) {
                case 'columns':
                    var columns = document.getElementById('columns').children;
                    var row = this.thead.insertRow(this.numRow);
                    for(var col = 0; col < columns.length; col ++) {
                        var column = columns[col];
                        var cellh = document.createElement('th');
                        cellh.innerHTML = column.attributes.getNamedItem('headertext').value;
                        row.appendChild(cellh);
                        var oMapCol = new MapCol(col, column.attributes.getNamedItem('datafield').value);
                        this.arrMapCols.push(oMapCol);
                        cellTbl++;
                    }
                    break;
            }
        }
        this.table.appendChild(this.thead);
        this.table.appendChild(this.tbody);

        document.getElementById(this.options.Id).appendChild(this.table);
    }

    DataTable.prototype.DataBind = function() {
        while (this.tbody.firstChild) {
            this.tbody.removeChild(this.tbody.firstChild);
        }
        this.numRow = 0;
        for(var idx = 0; idx < this.source.length; idx ++) {
            row = this.tbody.insertRow(this.numRow);
            var objJson = this.source[idx];
            for(cx = 0; cx < this.arrMapCols.length; cx ++) {
                var v_map_col = this.arrMapCols[cx];
                var cellData = row.insertCell(v_map_col.Idx);
                cellData.innerHTML = objJson[v_map_col.Name];
            }
            this.numRow++;
        }
    }

//     <div id="grd">
// <div id="columns">
// <div datafield="Id" headertext="ID"></div>
// <div datafield="Folio" headertext="Folio"></div>
// <div datafield="Piezas" headertext="Piezas"></div>
// </div>
// <div id="content"></div>
// </div>

    var MapCol = function(idx, name) {
    this.Idx = idx;
    this.Name = name;
    }

}());