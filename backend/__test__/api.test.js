import app from '../server.js';
import request from 'supertest';

//test case for food list
describe('Food API', () => {
    it('GET /api/food/list --> array users', async () => {
        return request(app).get('/api/food/list')
        .expect('Content-type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body)
            .toEqual(expect.objectContaining({  
                success: expect.any(Boolean),
                data: expect.arrayContaining([
                    expect.objectContaining({
                        name: expect.any(String),
                        description: expect.any(String),
                        price: expect.any(Number),
                        category: expect.any(String),
                        image: expect.any(String),
                    })
                ]),
            })
            )
        })
    });

    // test case for fetch food by ID
    it('GET /api/food/:id --> specific user by ID', async ()=>{
        return request(app).get('/api/food/66276d4e8f56d54d9c7590e6')
        .expect('Content-type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body)
            .toEqual(expect.objectContaining({
                success: expect.any(Boolean),
                message: expect.any(String),
                data: expect.objectContaining({
                    name: expect.any(String),
                    description: expect.any(String),
                    price: expect.any(Number),
                    category: expect.any(String),
                    image: expect.any(String),
                })
            })
            )
        })
    })

    // test case for update food
    it('POST /api/food/update/:id --> updated user', async ()=>{
        return request(app).post('/api/food/update/66276d4e8f56d54d9c7590e6')
        .send({
            name: 'Sandwich',
            description: 'A sandwich is a dish typically consisting of vegetables, sliced cheese or meat, placed on or between slices of bread, or more...',
            price: 60,
            category: 'sandwich'
        })
        .expect('Content-type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body)
            .toEqual(expect.objectContaining({
                success: expect.any(Boolean),
                message: expect.any(String),
            })
            )
        })
    })

    // test case for delete food
    it('POST /api/food/delete/:id --> delete user', async ()=>{
        return request(app).post('/api/food/remove')
        .expect('Content-type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body)
            .toEqual(expect.objectContaining({
                success: expect.any(Boolean),
                message: expect.any(String),
            })
            )
        })
    })
});


describe('Category API', ()=>{

    // test case for category list
    it('GET /api/category/list --> array category', async () => {
        return request(app).get('/api/category/list')
        .expect('Content-type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body)
            .toEqual(expect.objectContaining({  
                success: expect.any(Boolean),
                data: expect.arrayContaining([
                    expect.objectContaining({
                        name: expect.any(String),
                        image: expect.any(String)
                    })
                ]),
            })
            )
        })
    });

    // test case for fetch category by ID
    it('GET /api/category/:id --> specific category by ID', async ()=>{
        return request(app).get('/api/category/664797738a5cfd285b944dce')
        .expect('Content-type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body)
            .toEqual(expect.objectContaining({
                success: expect.any(Boolean),
                message: expect.any(String),
                data: expect.objectContaining({
                    name: expect.any(String),
                    image: expect.any(String)
                })
            })
            )
        })
    });

    // test case for update category
    it('POST /api/category/update/:id --> updated category', async ()=>{
        return request(app).post('/api/category/update/664797738a5cfd285b944dce')
        .send({
            name: 'Sandwich',
        })
        .expect('Content-type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body)
            .toEqual(expect.objectContaining({
                success: expect.any(Boolean),
                message: expect.any(String),
            })
            )
        })
    });

    // test case for delete category
    it('POST /api/category/:id --> delete category', async ()=>{
        return request(app).post('/api/category/remove')
        .expect('Content-type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body)
            .toEqual(expect.objectContaining({
                success: expect.any(Boolean),
                message: expect.any(String),
            })
            )
        })
    });
})