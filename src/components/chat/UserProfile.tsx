
import { User, UserRole } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUserInitials } from "@/lib/data";

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">الملف الشخصي</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-3">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-lg">
              {getUserInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="font-medium text-lg">{user.name}</h3>
            <p className="text-sm text-muted-foreground">
              {user.role === UserRole.TEACHER ? "معلم" : 
               user.role === UserRole.SUPERVISOR ? "مشرف" : "طالب"}
            </p>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium">البريد الإلكتروني:</p>
            <p className="text-sm">{user.email}</p>
          </div>
          
          {user.phone && (
            <div>
              <p className="text-sm font-medium">رقم الهاتف:</p>
              <p className="text-sm">{user.phone}</p>
            </div>
          )}
          
          <div>
            <p className="text-sm font-medium">اسم المستخدم:</p>
            <p className="text-sm">{user.username}</p>
          </div>
          
          {user.bio && (
            <div>
              <p className="text-sm font-medium">نبذة:</p>
              <p className="text-sm">{user.bio}</p>
            </div>
          )}
          
          <div>
            <p className="text-sm font-medium">الحالة:</p>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${user.online ? "bg-green-500" : "bg-gray-400"}`}></span>
              <p className="text-sm">{user.online ? "متصل الآن" : "غير متصل"}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
