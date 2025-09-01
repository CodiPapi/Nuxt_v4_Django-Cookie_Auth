from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator


@method_decorator(ensure_csrf_cookie, name='dispatch')
class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)
        if not user:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)

        res = Response({"username": user.username,
            "detail": "Login successful"},
            status=status.HTTP_200_OK)
        res.set_cookie(
            "access_token",
            str(refresh.access_token),
            httponly=True,
            samesite="none",
            secure=True,
        )
        res.set_cookie(
            "refresh_token",
            str(refresh),
            httponly=True,
            samesite="none",
            secure=True,
        )
        return res

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        res = Response({"detail": "Logged out"})
        res.delete_cookie("access_token")
        res.delete_cookie("refresh_token")
        # res.delete_cookie("csrftoken")
        return res

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"detail": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"detail": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password)
        user.save()

        return Response({"detail": "User registered successfully"}, status=status.HTTP_201_CREATED)

# @method_decorator(csrf_protect, name='dispatch') # Needed if POST/PUT/PATCH methods are used
class UserView(APIView):
    permission_classes = [IsAuthenticated] 
    def get(self, request):
        user = request.user
        return Response({"username": user.username})
