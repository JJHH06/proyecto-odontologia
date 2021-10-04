import time
from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1,5)

    # @task
    # def on_start(self):
    #     self.client.post("/", {"email":"123@gmail.com", "password":"123"}, headers={"token":"token123"})
    
    @task
    def page1(self):
        self.client.get("/informacion_pacientes")
        # self.client.post('/informacion_pacientes', {'busqueda':' '})
    
    @task
    def page2(self):
        self.client.get("/ingresar_paciente")

    @task
    def page3(self):
        self.client.get("/agenda")
    
    @task
    def page4(self):
        self.client.get("/ficha")

    @task
    def page5(self):
        self.client.get("/inventario")
    
    @task
    def page6(self):
        self.client.get("/")
    