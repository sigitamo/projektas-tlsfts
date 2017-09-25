export class Init {

    load() {
        if(localStorage.getItem('markers') === null || localStorage.getItem('markers') === undefined) {
            console.log('Nerasta pažymėtų vietų');

            var markers = [
                {
                    name: 'Stotis',
                    lat: 54.670581,
                    lng: 25.279761
                },
                {
                    name: 'Katedra',
                    lat: 54.6858486,
                    lng: 25.285545554                    
                },
                {
                    name: 'TV Bokštas',
                    lat: 54.6870936,
                    lng: 25.21256854,
                }
            ];

            localStorage.setItem('markers', JSON.stringify(markers));
        } else {
            console.log('įkraunamos esamos vietos');
        }
    }

}