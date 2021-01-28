from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import HttpResponse
import json
import base64
from .utils import blend

# Create your views here.

def get_generated_image(request):
    with open("image_blend/generated.png", "rb") as image_file:
        return HttpResponse(image_file.read(), content_type="image/png")

@csrf_exempt
def generate_image(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        blend.make_blend(data)
        with open("generated.png", "rb") as image_file:
            base64string = base64.b64encode(image_file.read())
            return HttpResponse(base64string)
    return HttpResponse("OK")