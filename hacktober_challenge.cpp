#include<bits/stdc++.h>
using namespace std;
#define int long long
#define loop(i, start, end) for (int i = start; i < end; i++)
#define rloop(i, start, end) for (int i = start; i >= end; i--)

vector<int> g[100005];
int n,m;
int cc=0;
vector<bool> vis;
vector<int> lead;

void solve(){
    //code goes here
    cin>>n>>m;
    vis.resize(n);

    loop(i,0,m){
        int u,v;
        cin>>u>>v;
        u--;v--;
        g[u].push_back(v);
        g[v].push_back(u);
    }

    function<void(int)> dfs = [&](int node) -> void{
        vis[node]=1;
        for(auto next:g[node]){
            if(!vis[next]) dfs(next);
        }
    };

    loop(i,0,n){
        if(!vis[i]){
            cc++;
            lead.push_back(i+1);
            dfs(i);
        }
    }

    cout<<cc-1<<endl;
    
    if(cc>1){
        int curr=lead[0];
        int next;
        loop(i,1,cc){
            next=lead[i];
            cout<<curr<<" "<<next<<endl;
            curr=next;
        }
    }
}

int32_t main()
{
#ifndef ONLINE_JUDGE
    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);
#endif
ios_base::sync_with_stdio(false);
cout.tie(NULL);
cin.tie(NULL);
    int t=1;
    // cin>>t;
    while (t--)
    {
        solve();
    }
    return 0;
}
