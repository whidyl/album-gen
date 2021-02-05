import os
from io import BytesIO
import random
import requests
import json
from PIL import Image, ImageOps, ImageFilter, ImageEnhance
import blend_modes
import numpy as np

def make_blend(JSON):
    print(JSON)
    width = JSON['settings']['width']
    height = JSON['settings']['height']
    featured = JSON['settings']['featured_only']

    
    if(JSON['cards']):
        featured_str = "featured/" if featured else "random/"
        size_str =  str(width) + 'x' + str(height) + '/' if width > 0 else ""
        terms_str = "?" + JSON['cards'][0]['term'].replace(' ', '-') + '/'
        url = "https://source.unsplash.com/" + featured_str + size_str + terms_str

        prev_img = None
        if width > 0:
            prev_img = Image.open("api/utils/background.jpg").resize((int(width), int(height)))
        else:
            prev_img = Image.open("api/utils/background.jpg").resize((1280, 1280))
        prev_img = filter_pil(JSON['cards'][0]['filter'], prev_img)
        prev_img = np.array(prev_img)
        prev_img = np.dstack((prev_img, np.full(prev_img.shape[:-1], 255)))
        prev_img = prev_img.astype(float)
        blended = prev_img
        for card in JSON['cards']:
            # fetch random image with unsplash api
            terms_str = "?" + card['term'].replace(' ', '-')
            url = "https://source.unsplash.com/" + featured_str + size_str + terms_str
            print(url)
            response = requests.get(url)
            img = Image.open(BytesIO(response.content))
            if width > 0:
                img = img.resize((int(width), int(height)))
            else:
                img = img.resize((1280, 1280))
            img = filter_pil(card['filter'], img)
            img = np.array(img)
            img = np.dstack((img, np.full(img.shape[:-1], 255)))
            img = img.astype(float)
            blended = blend_images(card['opacity'], card['mode'], prev_img, img)
            prev_img = blended  
        blended_raw = Image.fromarray(blended.astype(np.uint8))
        blended_raw.save("generated.png")

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
        return img.filter(ImageFilter.FIND_EDGES)
    else:
        return img
