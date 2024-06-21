from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics # type: ignore
from.serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny # type: ignore
from .models import Note

# Create your views here.
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # return Note.objects.all() /* if want all Notes whithout filter*/
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(f"errorr ===> {serializer.errors}")

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    

# Query set can defined as a variable or a function

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    