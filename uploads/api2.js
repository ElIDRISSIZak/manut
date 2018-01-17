transferDataSuccess($event: any) {
        alert("GOOOOOOOOOOOOOD");
        this.test = true;
        this.receivedData.push($event);
        console.log("cc",this.receivedData);
    }

    test: boolean = false;
    transferData: Object = {id: 1, msg: 'Hello', draw: true};
    receivedData: Array<any> = [];
