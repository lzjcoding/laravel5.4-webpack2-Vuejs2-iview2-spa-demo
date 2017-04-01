<?php
namespace App\Http\Controllers\Admin;

use App\Exceptions\Error;

class CommonController extends Controller
{

    public function uploadPic()
    {
        $PictureFile = $this->request->file('file');
        if ($PictureFile->isValid()) {
            $extension = $PictureFile->extension();
            if (! in_array($extension, ['jpg', 'jpeg', 'png'])) {
                throw new Error(400, 'PICTURE_EXTENSION_ERROR');
            }
            if ($PictureFile->getClientSize() > 10 * 1024 * 1024) {
                throw new Error(400, 'PICTURE_SIZE_OVER');
            }

            $path = $PictureFile->store('pics/post', 'upload');

            return $this->response(['path' => $path]);
        } else {
            throw new Error(400, 'INVALID_PICTURE');
        }
    }
}