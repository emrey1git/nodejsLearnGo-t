//filtreleeme parametrelerini parse eden fonlsiyon

export const parseFilterParams = (query)=>{
        const {name,email} = query;

        const filter = {};

        //isim filtrelemesi
        if(name){
            filter.name={
                $regex: name,
                $options: 'i' //büyük harf küçik harf  duyarsızlığı
            };
        }
        if(email){
            filter.email={
                $regex: email,
                $options: 'i'
            };
        }
        return filter;
};
