import {PostIt}  from './Model';

export class CSVWriter {
    
    public del:string;
    public enc:string;
    public nl:string;

    public csv:string = null;
    constructor (del, enc, nl) {
        this.del = ',' || del;
        this.enc = '"' || enc;
        this.nl = '\n' || nl;
    }

    public objectArrayToCSV (array) {
        let {csv, del, nl, enc} = this;
        if (array.length == 0) {
            return csv;
        } 
        var keys = Object.keys(array[0]);
        //this.csv = this.enc + "Category" + this.enc + this.del + this.enc + "Text" + this.enc + this.nl;
        csv='';
        csv += keys.join(del);
        csv += nl;

        
       array.forEach(function(item) {
            //this.csv += this.enc + array[i].getType() + this.enc + this.del + this.enc + array[i].text + this.enc + this.nl ;
          
            let ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) {
                    csv += del;
                }
                csv += enc + item[key] + enc;
                ctr++;
            });
            csv += nl;
        });
        this.csv = csv;
        console.log(this.csv);
    }

    public writeToFile() {
        if (!this.csv.match(/^data:text\/csv/i)) {
            this.csv = 'data:text/csv;charset=utf-8,' + this.csv;
        }
        var encodedUri = encodeURI(this.csv);
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "PostIts.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }


}