import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { GetCommitDto } from './github.dto';
import { TCommitList } from './type';
@Injectable()
export class GithubService {
  constructor(private httpService: HttpService) {}

  async getCommit({ user, repos, branch, startTime }: GetCommitDto) {
    try {
      const { data: commitList } = await this.httpService.axiosRef.get<
        any,
        AxiosResponse<TCommitList>
      >(
        `https://api.github.com/repos/${user}/${repos}/commits?sha=${branch}&since=${startTime}`,
      );
      if (commitList) {
        return { code: 200, commitList };
      }
    } catch (error) {
      return { code: 500, message: JSON.stringify(error) };
    }
  }
}
