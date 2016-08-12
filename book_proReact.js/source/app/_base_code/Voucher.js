import react from 'react';
import dom from 'react-dom';
import update from 'react-addons-updte';

class Voucher extends Compont {
    constructor() {
        super(...arguments);
        this.state = {
            passengers : ['Simmon, Robert A.', 'Taylor, Kathleen R.'],
            ticket : {
                company : 'Dalta',
                fightNo : '0990',
                departure : {
                    airport : 'LAS',
                    time : '2016-08-21T10:00:00.000Z'
                },
                arrival : {
                    ariport : 'MIA',
                    time : '2016-08-21T14:41:10.000Z'
                },
                codeshare : [
                    {company:'GL', flightNo:'9840'},
                    {company:'TM', flightNo:'5010'}
                ]
            }
        }
    }

    render() {
        return (

        );
    }
}
