import React from 'react'
import { Avatar, StackedAvatars } from '@comps/uiComps'
const Avatars = () => {
  return (
    <div>
      <h1 className="mb-2 text-center text-xl">Avatar Examples</h1>
      <div className="mb-8">
        <h1 className="mb-2 text-xl text-center">Single Avatar</h1>
        <div className="flex gap-x-4 justify-center">
          <div className="flex items-center flex-col justify-center">
            <Avatar
              name="mg"
              shape="rounded"
              size="lg"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
            <div className="mt-2">Avatar rounded</div>
          </div>
          <div className="flex items-center flex-col justify-center">
            <Avatar
              name="mg"
              shape="circular"
              size="lg"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
            <div className="mt-2">Avatar circular</div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h1 className="mb-2 text-xl text-center">Avatar With Initials</h1>
        <div className="flex gap-x-4 justify-center">
          <div className="flex items-center flex-col justify-center">
            <Avatar name="mg" shape="rounded" size="md" src="" withNameInitials />
            <div className="mt-2">Avatar rounded</div>
          </div>
          <div className="flex items-center flex-col justify-center">
            <Avatar name="mg" shape="circular" size="md" src="" withNameInitials />
            <div className="mt-2">Avatar circular</div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h1 className="mb-2 text-xl text-center">Empty stacked avatar</h1>
        <div className="flex gap-x-4 justify-center">
          <div className="flex items-center flex-col justify-center">
            <Avatar shape="circular" size="md" src="" />
            <div className="mt-2">Avatar rounded</div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h1 className="mb-2 text-xl text-center">Avatar Size</h1>
        <div className="flex gap-x-4 justify-center">
          <div className="flex items-center flex-col justify-center">
            <Avatar
              name="mg"
              shape="circular"
              size="xl"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
            <div className="mt-2">Avatar XL</div>
          </div>
          <div className="flex items-center flex-col justify-center">
            <Avatar
              name="mg"
              shape="circular"
              size="lg"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
            <div className="mt-2">Avatar Lg</div>
          </div>
          <div className="flex items-center flex-col justify-center">
            <Avatar
              name="mg"
              shape="circular"
              size="md"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
            <div className="mt-2">Avatar md</div>
          </div>
          <div className="flex items-center flex-col justify-center">
            <Avatar
              name="mg"
              shape="circular"
              size="sm"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
            <div className="mt-2">Avatar sm</div>
          </div>
          <div className="flex items-center flex-col justify-center">
            <Avatar
              name="mg"
              shape="circular"
              size="xs"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
            <div className="mt-2">Avatar xs</div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h1 className="mb-2 text-xl text-center">Stacked Avatars With Picture</h1>
        <div className="flex gap-x-4 justify-center">
          <div className="flex items-center flex-col justify-center">
            <StackedAvatars negativeSpace={3} numOfAvatar={3} size="md">
              <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <Avatar src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" />
              <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <Avatar src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" />
            </StackedAvatars>
            <div className="mt-2">with 3 avatar</div>
          </div>
          <div className="flex items-center flex-col justify-center">
            <StackedAvatars negativeSpace={4} numOfAvatar={4} size="md">
              <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <Avatar src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" />
              <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <Avatar src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" />
            </StackedAvatars>
            <div className="mt-2">with 4 avatar</div>
          </div>
          <div className="flex items-center flex-col justify-center">
            <StackedAvatars negativeSpace={5} numOfAvatar={5} size="md">
              <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <Avatar src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" />
              <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <Avatar src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" />
            </StackedAvatars>
            <div className="mt-2">with 5 avatar</div>
          </div>
          <div className="flex items-center flex-col justify-center">
            <StackedAvatars negativeSpace={6} numOfAvatar={6} size="md">
              <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <Avatar src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" />
              <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <Avatar src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" />
            </StackedAvatars>
            <div className="mt-2">with 6 avatar</div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h1 className="mb-2 text-xl text-center">Stacked Avatars With Name initial</h1>
        <div className="flex gap-x-4 justify-center">
          <div className="flex items-center flex-col justify-center">
            <StackedAvatars negativeSpace={3} numOfAvatar={3} size="md">
              <Avatar name="Cristiano Ronaldo" withNameInitials />
              <Avatar name="Lionel Messi" withNameInitials />
              <Avatar name="neymar" withNameInitials />
              <Avatar name="mbappe" withNameInitials />
              <Avatar name="Mohammed Salah" withNameInitials />
              <Avatar name="mane" withNameInitials />
            </StackedAvatars>
            <div className="mt-2">with 3 avatar</div>
          </div>
          <div className="flex items-center flex-col justify-center">
            <StackedAvatars negativeSpace={4} numOfAvatar={4} size="md">
              <Avatar name="Cristiano Ronaldo" withNameInitials />
              <Avatar name="Lionel Messi" withNameInitials />
              <Avatar name="neymar" withNameInitials />
              <Avatar name="mbappe" withNameInitials />
              <Avatar name="Mohammed Salah" withNameInitials />
              <Avatar name="mane" withNameInitials />
            </StackedAvatars>
            <div className="mt-2">with 4 avatar</div>
          </div>
          <div className="flex items-center flex-col justify-center">
            <StackedAvatars negativeSpace={5} numOfAvatar={5} size="md">
              <Avatar name="Cristiano Ronaldo" withNameInitials />
              <Avatar name="Lionel Messi" withNameInitials />
              <Avatar name="neymar" withNameInitials />
              <Avatar name="mbappe" withNameInitials />
              <Avatar name="Mohammed Salah" withNameInitials />
              <Avatar name="mane" withNameInitials />
            </StackedAvatars>
            <div className="mt-2">with 5 avatar</div>
          </div>
          <div className="flex items-center flex-col justify-center">
            <StackedAvatars negativeSpace={6} numOfAvatar={6} size="md">
              <Avatar name="Cristiano Ronaldo" withNameInitials />
              <Avatar name="Lionel Messi" withNameInitials />
              <Avatar name="neymar" withNameInitials />
              <Avatar name="mbappe" withNameInitials />
              <Avatar name="Mohammed Salah" withNameInitials />
              <Avatar name="mane" withNameInitials />
            </StackedAvatars>
            <div className="mt-2">with 6 avatar</div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h1 className="mb-2 text-xl text-center">Empty Stacked Avatars</h1>
        <div className="flex gap-x-4 justify-center">
          <div className="flex items-center flex-col justify-center">
            <StackedAvatars negativeSpace={3} numOfAvatar={3} size="md">
              <Avatar />
              <Avatar />
              <Avatar />
              <Avatar />
              <Avatar />
              <Avatar />
            </StackedAvatars>
            <div className="mt-2">with 3 empty avatar</div>
          </div>
          <div className="flex items-center flex-col justify-center">
            <StackedAvatars negativeSpace={4} numOfAvatar={4} size="md">
              <Avatar />
              <Avatar />
              <Avatar />
              <Avatar />
              <Avatar />
              <Avatar />
            </StackedAvatars>
            <div className="mt-2">with 4 empty avatar</div>
          </div>
          <div className="flex items-center flex-col justify-center">
            <StackedAvatars negativeSpace={6} numOfAvatar={6} size="md">
              <Avatar />
              <Avatar />
              <Avatar />
              <Avatar />
              <Avatar />
              <Avatar />
            </StackedAvatars>
            <div className="mt-2">with 6 empty avatar</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Avatars
