import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from '@modules/auth/utils/guards/google/google.guard';
import { Envs } from '@shared/envs/envs';

@Controller('auth')
export class GoogleAuthController {
  @Get('/google/login')
  @UseGuards(GoogleAuthGuard)
  async GoogleLoginAuth(@Req() request, @Res() response) {
    const setCookie = (name: string, content: string) => {
      response.cookie(name, content, { maxAge: Envs.COOKIE_MAXAGE });
    };

    setCookie('user.token', request.user.token);
    setCookie('user.data', JSON.stringify(request.user.data));

    const application = `${Envs.FRONTEND_URL}/admin`;
    return response.redirect(application);
  }
}
