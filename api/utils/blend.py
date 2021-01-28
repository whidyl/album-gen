import os
from io import BytesIO
import random
import requests
import json
from PIL import Image, ImageOps, ImageFilter, ImageEnhance
import blend_modes
#from scipy import ndimage
import numpy as np

def make_blend(JSON):
    print(JSON)
    width = JSON['settings']['width']
    height = JSON['settings']['height']

    
    if(JSON['cards']):
        url = 'https://source.unsplash.com/featured/' + str(width) + 'x' + str(height) + '/?' + JSON['cards'][0]['term']
        prev_img = Image.open("api/utils/background.jpg").resize((int(width/2), int(height/2)))
        prev_img = np.array(prev_img)
        prev_img = np.dstack((prev_img, np.full(prev_img.shape[:-1], 255)))
        prev_img = prev_img.astype(float)
        blended = prev_img
        for card in JSON['cards']:
            # fetch random image with unsplash api
            url = 'https://source.unsplash.com/random/' + str(width) + 'x' + str(height) + '/?' + card['term']
            response = requests.get(url)
            img = Image.open(BytesIO(response.content)).resize((int(width/2), int(height/2)))
            img = np.array(img)
            img = np.dstack((img, np.full(img.shape[:-1], 255)))
            img = img.astype(float)
            blended = blend_images(card['opacity'], card['mode'], prev_img, img)
            prev_img = blended  
        blended_raw = Image.fromarray(blended.astype(np.uint8))
        blended_raw.save("generated.png")

        
    # url = 'https://source.unsplash.com/random/' + width + 'x' + height + '/?' + str(query1)
    # response = requests.get(url)
    # img_1 = Image.open(BytesIO(response.content)).resize((int(width), int(height)))
    # img_1 = numpy.array(img_1)
    # img_1 = numpy.dstack((img_1, numpy.full(img_1.shape[:-1], 255)))
    # img_1 = img_1.astype(float)

    # url = 'https://source.unsplash.com/random/' + width + 'x' + height + '/?' + str(query2)
    # response = requests.get(url)
    # img_2 = Image.open(BytesIO(response.content)).resize((int(width), int(height)))
    # img_2 = numpy.array(img_2)
    # img_2 = numpy.dstack((img_2, numpy.full(img_2.shape[:-1], 255)))
    # img_2 = img_2.astype(float)

    # url = 'https://source.unsplash.com/random/' + width + 'x' + height + '/?' + str(query3)
    # response = requests.get(url)
    # img_3 = Image.open(BytesIO(response.content)).resize((int(width), int(height)))
    # img_3 = numpy.array(img_3)
    # img_3 = numpy.dstack((img_3, numpy.full(img_2.shape[:-1], 255)))
    # img_3 = img_3.astype(float)

    # # overlay images with blend modes
    # blend = blend_images(opacity2, current_blend_mode_1.get(), img_1, img_2)
    # blend = blend_images(opacity3, current_blend_mode_2.get(), blend, img_3)

    # # apply filters
    # blend = filter_np(current_filter_1.get(), blend)
    # blend = numpy.uint8(blend)
    # blended_raw = Image.fromarray(blend)
    # blended_raw = filter_pil(current_filter_1.get(), blended_raw)
    # blended_raw = filter_pil(current_filter_2.get(), blended_raw)
    # blended_raw.show()

def blend_images(opacity, mode, img_1, img_2):
    if opacity > 0:
        if mode == "Dodge":
            return blend_modes.dodge(img_1, img_2, opacity)
        elif mode == "Addition":
            return blend_modes.addition(img_1, img_2, opacity)
        elif mode == "Overlay":
            return blend_modes.overlay(img_1, img_2, opacity)
        elif mode == "Subtract":
            return blend_modes.subtract(img_1, img_2, opacity)
        elif mode == "Grain Extract":
            return blend_modes.grain_extract(img_1, img_2, opacity)
        elif mode == "Darken Only":
            return blend_modes.darken_only(img_1, img_2, opacity)
        elif mode == "Screen":
            return blend_modes.screen(img_1, img_2, opacity)
        elif mode == "Divide":
            return blend_modes.divide(img_1, img_2, opacity)
        elif mode == "Grain Merge":
            return blend_modes.grain_merge(img_1, img_2, opacity)
        elif mode == "Difference":
            return blend_modes.difference(img_1, img_2, opacity)
        elif mode == "Multiply":
            return blend_modes.multiply(img_1, img_2, opacity)
        elif mode == "Soft Light":
            return blend_modes.soft_light(img_1, img_2, opacity)
        elif mode == "Hard Light":
            return blend_modes.hard_light(img_1, img_2, opacity)
        elif mode == "Lighten Only":
            return blend_modes.lighten_only(img_1, img_2, opacity)
        elif mode == "None":
            return blend_modes.normal(img_1, img_2, opacity)
    else:
        return img_1


def filter_np(filter, img):
    if filter == "Laplace":
        return ndimage.laplace(img)
    elif filter == "Gaussian Greyscale":
        return ndimage.gaussian_filter(img, sigma=1)
    elif filter == "Sobel":
        return ndimage.sobel(img)
    elif filter == "Bright":
        return 3 * img
    elif filter == "*10":
        return 10 * img
    elif filter == "Grayscale":
        return numpy.dot(img[..., :3], [0.2989, 0.5870, 0.1140])
    else:
        return img


def filter_pil(filter, img):
    if filter == "Invert":
        return ImageOps.invert(img.convert('RGB'))
    elif filter == "Posterize":
        return ImageOps.posterize(img.convert('RGB'), 3)
    elif filter == "Posterize 2":
        blended_raw = ImageOps.posterize(img.convert('RGB'), 1)
        lightener = ImageEnhance.Brightness(blended_raw)
        return lightener.enhance(2)
    elif filter == "Solarize":
        return ImageOps.solarize(img.convert('RGB'), 70)
    elif filter == "Emboss":
        return img.filter(ImageFilter.EMBOSS)
    elif filter == "Gaussian Blur":
        return img.filter(ImageFilter.GaussianBlur(5))
    elif filter == "High Contrast":
        contraster = ImageEnhance.Contrast(img)
        return contraster.enhance(4)
    elif filter == "Intense Sharpen":
        sharpener = ImageEnhance.Sharpness(img)
        return sharpener.enhance(20)
    elif filter == "Lighten":
        lightener = ImageEnhance.Brightness(img)
        return lightener.enhance(3)
    elif filter == "Find Edges":
        return img.convert("L").filter(ImageFilter.FIND_EDGES)
    else:
        return img
