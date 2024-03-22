import { faker} from '@faker-js/faker';

interface Gallery {
    user_id: number
    photo: string
    
}
const fakeGallery = {
    create : function(user_id: number): Gallery {
        return {
            user_id: user_id,
            photo: faker.image.urlLoremFlickr({ category: 'abstract' })
    }
    },

    createMany: function(count: number, user_id: number): Gallery[] {
        const gallery: Gallery[] = [];
        for (let i = 0; i < count; i++) {
            gallery.push(this.create(user_id ));
        }
        return gallery;
    }
}

export default fakeGallery