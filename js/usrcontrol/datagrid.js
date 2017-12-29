;(function() {
    
    // Define constructor
    this.DataGrid = function() {

        // Create global element references
        this.table = null;
        this.thead = null;
        this.tbody = null;
        this.tfoot = null;
        this.arrMapCols = [];
        this.arrDataKeys = [];
        this.numRow = null;
        
        
        // Define option defaults
        var defaults = {
            Id: '',
            CssClass: 'pure-table',
            Style: 'table-layout: fixed; word-wrap: break-word;',
            Width: '95%',
            source: null,
            AutoGenerateColumns: false,
            DataKeyNames: [],
            onRowCommand: ''
        }

        // Create options by extending defaults with the passed in arugments
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

    }

    // Public methods
    DataGrid.prototype.open = function() {
        // open code goes here
        buildOut.call(this);

        //initializeEvents.call(this);
    }

    DataGrid.prototype.clear = function() {
        this.table.innerHTML = '';
    }

    DataGrid.prototype.dataBind = function() {
        try {
            while (this.tbody.firstChild) {
                this.tbody.removeChild(this.tbody.firstChild);
            }
            
            fillDataGrid();

        } catch (error) {
            console.log(error.message);
        }
    }

    function initializeEvents() {
        var _ = this;
        if(_.options.onRowCommand!=null && this.options.onRowCommand.length > 0) {

        }
    }

    function fillDataGridWithDataKeys() {
        this.numRow = 0;
        var _ = this;
        for(var idx = 0; idx < this.options.source.length; idx ++) {
            row = this.tbody.insertRow(this.numRow);
            var objJson = this.options.source[idx];
            var datakeyvalue = {};
            for(var idxDK = 0; idxDK < this.options.DataKeyNames; idxDK ++) {
                datakeyvalue[this.options.DataKeyNames[idx]] = objJson[this.options.DataKeyNames[idx]];
            }

            var dataKeyname = {
                numRow: _.numRow,
                value: datakeyvalue
            };

            row.setAttribute("Id", "rowkey_" + this.numRow);

            for(cx = 0; cx < this.arrMapCols.length; cx ++) {
                var v_map_col = this.arrMapCols[cx];
                var cellData = row.insertCell(v_map_col.Idx);
                cellData.innerHTML = objJson[v_map_col.Name];
            }
            this.numRow++;
        }
    }

    function fillDataGrid() {
        this.numRow = 0;
        for(var idx = 0; idx < this.options.source.length; idx ++) {
            row = this.tbody.insertRow(this.numRow);
            var objJson = this.options.source[idx];
            for(cx = 0; cx < this.arrMapCols.length; cx ++) {
                var v_map_col = this.arrMapCols[cx];
                var cellData = row.insertCell(v_map_col.Idx);
                cellData.innerHTML = objJson[v_map_col.Name];
                cellData.setAttribute('type', objJson[v_map_col.Type]);
            }
            this.numRow++;
        }
    }

    function buildOut() { 

        this.table = document.getElementById('tbl_' + this.options.Id);
        if(this.table!=null) {
        	document.getElementById(this.options.Id).removeChild(this.table);
        }
        this.table = document.createElement('table');
        this.table.setAttribute('id','tbl_' + this.options.Id);
        this.table.setAttribute('style', this.options.Style);
        this.table.className = this.options.CssClass;
        this.table.setAttribute('width', this.options.Width);

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

                        var oMapCol = new MapCol(
                            col, 
                            column.attributes.getNamedItem('datafield').value, 
                            column.attributes.getNamedItem('type').value
                        );

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

//     <div id="grd">
// <div id="columns">
// <div datafield="Id" headertext="ID"></div>
// <div datafield="Folio" headertext="Folio"></div>
// <div datafield="Piezas" headertext="Piezas"></div>
// </div>
// <div id="content"></div>
// </div>

    var MapCol = function(idx, name, type) {
        this.Idx = idx;
        this.Name = name;
        this.Type = type;
    }

    var MapDataKeys = function(numRow, dataKey) {
        this.NumRow = numRow;
        this.DataKey = dataKey;
    }

    // Utility method to extend defaults with user options
    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

}());