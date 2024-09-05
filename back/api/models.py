from typing import Any
from django.db import models

class Filmes(models.Model):
    titulo = models.CharField(max_length=255)
    genero = models.CharField(max_length=255)
    ano = models.CharField(max_length=255)
    idioma = models.CharField(max_length=255)
    classif = models.CharField(max_length=255)
    
    def __init__(self):
        return self.titulo

class Genero(models.Model):
    genre = models.CharField(max_length=255)

    def __init__(self):
        return self.genre